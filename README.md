# strapi-provider-upload-bunnystorage

**BunnyStorage** is a BunnyCDN Upload Provider for Strapi, ispired at [strapi-provider-upload-bunnycdn](https://github.com/laukatu/strapi-provider-upload-bunnycdn), but different, BunnyStorage **upload videos to Stream service**.

## Install
```bash
npm i strapi-provider-upload-bunnystorage
```

## Configurations

See the [using a provider](https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#environment-variables) for setting and using environment variables in your configs.

**Example**

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  //...
  upload: {
    provider: 'bunnystorage',
    providerOptions: {
      storageHost: env('BUNNYSTORAGE_STORAGE_HOST'),
      storageZone: env('BUNNYSTORAGE_STORAGE_ZONE'),
      pullZone: env('BUNNYSTORAGE_PULL_ZONE'),
      storageFolder: env('BUNNYSTORAGE_STORAGE_FOLDER', null),
      storageApiKey: env('BUNNYSTORAGE_STORAGE_API_KEY'),
      videostreamLibraryId: env('BUNNYSTORAGE_VIDEOSTREAM_LIBRARY_ID'),
      videostreamApiKey: env('BUNNYSTORAGE_VIDEOSTREAM_API_KEY'),
      videostreamCollectionId: env('BUNNYSTORAGE_VIDEOSTREAM_COLLECTION_ID', null),
    }
  },
  //...
});
```

`.env`

```
HOST=0.0.0.0
PORT=1337
BASE_URL=http://localhost:1337
//...
//BunnyStorage
BUNNYSTORAGE_STORAGE_HOST=https://storage.bunnycdn.com
BUNNYSTORAGE_STORAGE_ZONE=xxxxxx
BUNNYSTORAGE_PULL_ZONE=xxxxxx
BUNNYSTORAGE_STORAGE_FOLDER=strapi
BUNNYSTORAGE_STORAGE_API_KEY=xxxxxx
BUNNYSTORAGE_VIDEOSTREAM_LIBRARY_ID=xxxxxx
BUNNYSTORAGE_VIDEOSTREAM_API_KEY=xxxxxx
BUNNYSTORAGE_VIDEOSTREAM_COLLECTION_ID=xxxxxx
```

## Contributors

<a href="https://github.com/CodexAgency/strapi-provider-upload-bunnystorage/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=CodexAgency/strapi-provider-upload-bunnystorage" />
</a>

## Other

![image](https://user-images.githubusercontent.com/2349096/131691902-47444997-dd3b-4d67-8ef1-c3ba43aea896.png)

![image](https://user-images.githubusercontent.com/2349096/131691512-a0968279-fb4a-4690-a63d-d3b70c85ef84.png)

![image](https://user-images.githubusercontent.com/2349096/131691308-6dae9c85-aba6-4250-9cec-7e9a2e80969e.png)
