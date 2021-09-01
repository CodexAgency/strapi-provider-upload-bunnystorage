module.exports = ({ env }) => ({
  ///
  upload: {
    provider: 'bunnystorage',
    providerOptions: {
      storageHost: env('BUNNYCDN_STORAGE_HOST'),
      storageZone: env('BUNNYCDN_STORAGE_ZONE'),
      pullZone: env('BUNNYCDN_PULL_ZONE'),
      storageFolder: env('BUNNYCDN_STORAGE_FOLDER', null),
      storageApiKey: env('BUNNYCDN_STORAGE_API_KEY'),
      videostreamLibraryId: env('BUNNYCDN_VIDEOSTREAM_LIBRARY_ID'),
      videostreamApiKey: env('BUNNYCDN_VIDEOSTREAM_API_KEY'),
      videostreamCollectionId: env('BUNNYCDN_VIDEOSTREAM_COLLECTION_ID', null),
    }
  },
  ///
});
