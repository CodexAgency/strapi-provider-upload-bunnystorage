'use strict';

const axios = require('axios');

module.exports = {
  init(config) {


    let storageEndpoint = `${config.storageHost}/${config.storageZone}/`;

    if (config.storageFolder != null) {
      storageEndpoint += config.storageFolder + '/';
    }

    let videoEndpoint = 'http://video.bunnycdn.com/library/' + config.videostreamLibraryId + '/videos';


    function isVideo(file) {
      const types = [".mpeg", ".mp4", ".m4v", ".wmv", ".avi", ".flv",];
      let video = false;

      Object.values(types).forEach((type) => {
        if (file.ext === type) video = true;

        return video;
      });

      return video;
    }

    return {
      upload(file) {
        if (!isVideo(file)) {
          return new Promise((resolve, reject) => {
            axios.put(`${storageEndpoint}${file.hash}${file.ext}`,
                file.buffer,
                {
                  headers: {'AccessKey': config.storageApiKey}, maxContentLength: Infinity,
                  maxBodyLength: Infinity,
                },)
                .then(function (response) {
                  if (response.data.HttpCode === 201) {
                    file.url = config.storageFolder != null ? `/${config.storageFolder}/${file.hash}${file.ext}` : `/${file.hash}${file.ext}`;
                    resolve();
                  }
                })
                .catch(function (error) {
                  console.log(error);

                  return reject(error);
                });
          });
        } else {


          return new Promise((resolve, reject) => {

            let data;

            const fileName = `${file.hash}${file.ext}`;

            if (config.videostreamCollectionId != null) {
              data = {
                title: fileName,
                collectionId: config.videostreamCollectionId
              }
            } else {
              data = {
                title: fileName
              }
            }

            axios.post(videoEndpoint,
                data,
                {headers: {'AccessKey': config.videostreamApiKey}})
                .then(function (response) {
                  if (response.status === 200) {

                    const guid = response.data.guid;

                    axios.put(videoEndpoint + '/' + guid, file.buffer, {
                      headers: {'AccessKey': config.videostreamApiKey, 'Content-Type': 'application/json'},
                      maxBodyLength: Infinity,
                    }).then(function (res) {
                      axios.get(videoEndpoint + '/' + guid, {
                        headers: {'AccessKey': config.videostreamApiKey, 'Content-Type': 'application/json'},
                      }).then(function (r) {
                        file.url = `/${guid}/playlist.m3u8`;
                        file.previewUrl = `/${guid}/${r.data.thumbnailFileName}`;
                        file.width = r.data.width;
                        file.height = r.data.height;
                        file.provider_metadata = {animationUrl:`/${guid}/preview.webp`,  ...r.data};
                        resolve();
                      }).catch(function (error){
                        console.log(error);
                        return reject(error);
                      });
                    }).catch(function (error) {
                      console.log(error);
                      return reject(error);
                    });
                  }
                })
                .catch(function (error) {
                  console.log(error);

                  return reject(error);
                });
          });

        }
      }
      ,
      delete: async (file) => {
        return new Promise((resolve, reject) => {
          if (!isVideo(file)) {
            axios.delete(`${storageEndpoint}${file.hash}${file.ext}`,
                {headers: {'AccessKey': config.storageApiKey}})
                .then(function (response) {
                  if (response.data.HttpCode === 200) {
                    resolve();
                  }
                })
                .catch(function (error) {
                  console.log(error);

                  return reject(error);
                });
          } else {

            const videoId = file.url.replace('/playlist.m3u8', '');

            axios.delete(`${videoEndpoint}${videoId}`,
                {headers: {'AccessKey': config.videostreamApiKey}})
                .then(function (response) {

                  resolve();
                })
                .catch(function (error) {
                  console.log(error);

                  return reject(error);
                });
          }
        });
      }
    };
  },
};
