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
