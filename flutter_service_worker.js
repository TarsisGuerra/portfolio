'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "3f73475c5ffe8c11657df95339784b8a",
"assets/AssetManifest.bin.json": "623e3b9e342a622834ae9736cd4d2663",
"assets/AssetManifest.json": "d8557478f164ef6cfa66ff8612388e1c",
"assets/assets/fonts/Poppins-Bold.ttf": "08c20a487911694291bd8c5de41315ad",
"assets/assets/fonts/Poppins-Light.ttf": "fcc40ae9a542d001971e53eaed948410",
"assets/assets/fonts/Poppins-Medium.ttf": "bf59c687bc6d3a70204d3944082c5cc0",
"assets/assets/fonts/Poppins-Regular.ttf": "093ee89be9ede30383f39a899c485a82",
"assets/assets/fonts/Poppins-Thin.ttf": "9ec263601ee3fcd71763941207c9ad0d",
"assets/assets/images/design.png": "4ada61aad14b9aeeee068edd125e8500",
"assets/assets/images/figmalogo.png": "2b76119de13c41f9ae16b10be432f89a",
"assets/assets/images/flutterlogo.png": "c2aba82816cee1d8846a617ce5d1453f",
"assets/assets/images/getsite.png": "ad946984d9f91ac5570ee97a02c73d4e",
"assets/assets/images/git.png": "fc79f48166ae43d99b90f008627bbbea",
"assets/assets/images/ig.png": "85a840efa7a549cf9b5aa81d588a5d0d",
"assets/assets/images/in.png": "317181d0a0e4202aaa1904ec99fcfb75",
"assets/assets/images/logotarsis.png": "aa9c86c4e7b9db83b8adaf0b4bc6fb4a",
"assets/assets/images/maya.png": "282c3886d6b223e38881e4b1523f9734",
"assets/assets/images/mayalogo.png": "fa4f20531a6e5990f6b67f07adf875e7",
"assets/assets/images/pedro.png": "34e55eebc62b2646cebe6b1ca1db418a",
"assets/assets/images/pedrosite.png": "5158140c7988108767ecf6a1db6b43a8",
"assets/assets/images/robo1.png": "4f40fb22b7990f1f335ae5eb0f035602",
"assets/assets/images/robo2.png": "ebe578a7e3e15f95854891899fec79e6",
"assets/assets/images/tarsis.jpg": "de9eaec70c38eadffd43fd28ffda76ec",
"assets/assets/images/unity.png": "792c18e1616d20114c26e83eb1419e7f",
"assets/assets/images/unitylogo.png": "a1742c2cb7baa48390c3952597f5c566",
"assets/assets/images/vamossite.png": "921f10175de99547296f0831f52b6ce9",
"assets/assets/images/web.png": "83b5fc52fe0536d253093ac089ee95da",
"assets/FontManifest.json": "5a05e3cf1432f4f3e7508866b231f7cd",
"assets/fonts/MaterialIcons-Regular.otf": "b5889581e524fa78b18cc7919324ec73",
"assets/NOTICES": "9cb40d6c9121ce5647e2c791581e4410",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/social_media_buttons/fonts/SocialMediaIcons.ttf": "be271838cfb555093a41e12292acce83",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "d6999edadfd4749b00e3d360fa8f7308",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "6a5f87d4d4f3695dd7bd4ce4a8bc8a48",
"icons/Icon-192.png": "dfddf5fb8f4bf6a4c3d42f30aaf03634",
"icons/Icon-512.png": "df0fa3c89b9c25e7108092fef0631a1a",
"icons/Icon-maskable-192.png": "dfddf5fb8f4bf6a4c3d42f30aaf03634",
"icons/Icon-maskable-512.png": "df0fa3c89b9c25e7108092fef0631a1a",
"index.html": "ac074dc93ba145f3bffb6c6e6479fe0d",
"/": "ac074dc93ba145f3bffb6c6e6479fe0d",
"main.dart.js": "d8aca231170509b31404930b46f235aa",
"manifest.json": "a1d7f48cc07b565f0913cb7a532eca0d",
"version.json": "18ff49a32722ac99429a54f69023a768"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
