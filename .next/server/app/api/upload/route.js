/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/upload/route";
exports.ids = ["app/api/upload/route"];
exports.modules = {

/***/ "(rsc)/./app/api/upload/route.ts":
/*!*********************************!*\
  !*** ./app/api/upload/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/.pnpm/@supabase+supabase-js@2.103.3/node_modules/@supabase/supabase-js/dist/index.mjs\");\n/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sharp */ \"sharp\");\n/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sharp__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n// Use service role key to bypass RLS for storage uploads\nconst supabaseAdmin = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_2__.createClient)(\"https://jevayoskhfwpqsuedcie.supabase.co\", process.env.SUPABASE_SERVICE_ROLE_KEY || \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpldmF5b3NraGZ3cHFzdWVkY2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1Mjc3MzcsImV4cCI6MjA5MjEwMzczN30.LpbnyCGcJ0eYIedKS13X0tD7ZD9wJ6ybeL4TcQyiPjU\");\nasync function POST(request) {\n    try {\n        const formData = await request.formData();\n        const file = formData.get('file');\n        const bucket = formData.get('bucket');\n        let path = formData.get('path');\n        if (!file || !bucket || !path) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Missing required fields'\n            }, {\n                status: 400\n            });\n        }\n        const bytes = await file.arrayBuffer();\n        const buffer = Buffer.from(bytes);\n        // Convert to WebP\n        const webpBuffer = await sharp__WEBPACK_IMPORTED_MODULE_1___default()(buffer).webp({\n            quality: 80\n        }).toBuffer();\n        // Ensure path has .webp extension\n        const pathParts = path.split('.');\n        pathParts[pathParts.length - 1] = 'webp';\n        path = pathParts.join('.');\n        const { error: uploadError } = await supabaseAdmin.storage.from(bucket).upload(path, webpBuffer, {\n            contentType: 'image/webp',\n            upsert: true\n        });\n        if (uploadError) {\n            console.error('Upload error:', uploadError);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: uploadError.message\n            }, {\n                status: 500\n            });\n        }\n        const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            publicUrl\n        });\n    } catch (error) {\n        console.error('Upload API error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VwbG9hZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF1RDtBQUNIO0FBQzNCO0FBRXpCLHlEQUF5RDtBQUN6RCxNQUFNRyxnQkFBZ0JGLG1FQUFZQSxDQUM5QkcsMENBQW9DLEVBQ3BDQSxRQUFRQyxHQUFHLENBQUNFLHlCQUF5QixJQUFJSCxrTkFBeUM7QUFHL0UsZUFBZUssS0FBS0MsT0FBb0I7SUFDM0MsSUFBSTtRQUNBLE1BQU1DLFdBQVcsTUFBTUQsUUFBUUMsUUFBUTtRQUN2QyxNQUFNQyxPQUFPRCxTQUFTRSxHQUFHLENBQUM7UUFDMUIsTUFBTUMsU0FBU0gsU0FBU0UsR0FBRyxDQUFDO1FBQzVCLElBQUlFLE9BQU9KLFNBQVNFLEdBQUcsQ0FBQztRQUV4QixJQUFJLENBQUNELFFBQVEsQ0FBQ0UsVUFBVSxDQUFDQyxNQUFNO1lBQzNCLE9BQU9mLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQTBCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNqRjtRQUVBLE1BQU1DLFFBQVEsTUFBTVAsS0FBS1EsV0FBVztRQUNwQyxNQUFNQyxTQUFTQyxPQUFPQyxJQUFJLENBQUNKO1FBRTNCLGtCQUFrQjtRQUNsQixNQUFNSyxhQUFhLE1BQU10Qiw0Q0FBS0EsQ0FBQ21CLFFBQzFCSSxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFHLEdBQ25CQyxRQUFRO1FBRWIsa0NBQWtDO1FBQ2xDLE1BQU1DLFlBQVliLEtBQUtjLEtBQUssQ0FBQztRQUM3QkQsU0FBUyxDQUFDQSxVQUFVRSxNQUFNLEdBQUcsRUFBRSxHQUFHO1FBQ2xDZixPQUFPYSxVQUFVRyxJQUFJLENBQUM7UUFFdEIsTUFBTSxFQUFFZCxPQUFPZSxXQUFXLEVBQUUsR0FBRyxNQUFNN0IsY0FBYzhCLE9BQU8sQ0FDckRWLElBQUksQ0FBQ1QsUUFDTG9CLE1BQU0sQ0FBQ25CLE1BQU1TLFlBQVk7WUFDdEJXLGFBQWE7WUFDYkMsUUFBUTtRQUNaO1FBRUosSUFBSUosYUFBYTtZQUNiSyxRQUFRcEIsS0FBSyxDQUFDLGlCQUFpQmU7WUFDL0IsT0FBT2hDLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO2dCQUFFQyxPQUFPZSxZQUFZTSxPQUFPO1lBQUMsR0FBRztnQkFBRXBCLFFBQVE7WUFBSTtRQUMzRTtRQUVBLE1BQU0sRUFBRXFCLE1BQU0sRUFBRUMsU0FBUyxFQUFFLEVBQUUsR0FBR3JDLGNBQWM4QixPQUFPLENBQ2hEVixJQUFJLENBQUNULFFBQ0wyQixZQUFZLENBQUMxQjtRQUVsQixPQUFPZixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztZQUFFd0I7UUFBVTtJQUN6QyxFQUFFLE9BQU92QixPQUFZO1FBQ2pCb0IsUUFBUXBCLEtBQUssQ0FBQyxxQkFBcUJBO1FBQ25DLE9BQU9qQixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztZQUFFQyxPQUFPQSxNQUFNcUIsT0FBTztRQUFDLEdBQUc7WUFBRXBCLFFBQVE7UUFBSTtJQUNyRTtBQUNKIiwic291cmNlcyI6WyIvVXNlcnMvbmZzY2FyczAwMS9Eb2N1bWVudHMvR2l0SHViL05hdGFsaWVfTWUvYXBwL2FwaS91cGxvYWQvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ1xuaW1wb3J0IHNoYXJwIGZyb20gJ3NoYXJwJ1xuXG4vLyBVc2Ugc2VydmljZSByb2xlIGtleSB0byBieXBhc3MgUkxTIGZvciBzdG9yYWdlIHVwbG9hZHNcbmNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVDbGllbnQoXG4gICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMISxcbiAgICBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIHx8IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIVxuKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxdWVzdC5mb3JtRGF0YSgpXG4gICAgICAgIGNvbnN0IGZpbGUgPSBmb3JtRGF0YS5nZXQoJ2ZpbGUnKSBhcyBGaWxlXG4gICAgICAgIGNvbnN0IGJ1Y2tldCA9IGZvcm1EYXRhLmdldCgnYnVja2V0JykgYXMgc3RyaW5nXG4gICAgICAgIGxldCBwYXRoID0gZm9ybURhdGEuZ2V0KCdwYXRoJykgYXMgc3RyaW5nXG5cbiAgICAgICAgaWYgKCFmaWxlIHx8ICFidWNrZXQgfHwgIXBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBmaWVsZHMnIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJ5dGVzID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGJ5dGVzKVxuXG4gICAgICAgIC8vIENvbnZlcnQgdG8gV2ViUFxuICAgICAgICBjb25zdCB3ZWJwQnVmZmVyID0gYXdhaXQgc2hhcnAoYnVmZmVyKVxuICAgICAgICAgICAgLndlYnAoeyBxdWFsaXR5OiA4MCB9KVxuICAgICAgICAgICAgLnRvQnVmZmVyKClcblxuICAgICAgICAvLyBFbnN1cmUgcGF0aCBoYXMgLndlYnAgZXh0ZW5zaW9uXG4gICAgICAgIGNvbnN0IHBhdGhQYXJ0cyA9IHBhdGguc3BsaXQoJy4nKVxuICAgICAgICBwYXRoUGFydHNbcGF0aFBhcnRzLmxlbmd0aCAtIDFdID0gJ3dlYnAnXG4gICAgICAgIHBhdGggPSBwYXRoUGFydHMuam9pbignLicpXG5cbiAgICAgICAgY29uc3QgeyBlcnJvcjogdXBsb2FkRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uc3RvcmFnZVxuICAgICAgICAgICAgLmZyb20oYnVja2V0KVxuICAgICAgICAgICAgLnVwbG9hZChwYXRoLCB3ZWJwQnVmZmVyLCB7XG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdpbWFnZS93ZWJwJyxcbiAgICAgICAgICAgICAgICB1cHNlcnQ6IHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHVwbG9hZEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVcGxvYWQgZXJyb3I6JywgdXBsb2FkRXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogdXBsb2FkRXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IGRhdGE6IHsgcHVibGljVXJsIH0gfSA9IHN1cGFiYXNlQWRtaW4uc3RvcmFnZVxuICAgICAgICAgICAgLmZyb20oYnVja2V0KVxuICAgICAgICAgICAgLmdldFB1YmxpY1VybChwYXRoKVxuXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHB1YmxpY1VybCB9KVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignVXBsb2FkIEFQSSBlcnJvcjonLCBlcnJvcilcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjcmVhdGVDbGllbnQiLCJzaGFycCIsInN1cGFiYXNlQWRtaW4iLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwiUE9TVCIsInJlcXVlc3QiLCJmb3JtRGF0YSIsImZpbGUiLCJnZXQiLCJidWNrZXQiLCJwYXRoIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiYnl0ZXMiLCJhcnJheUJ1ZmZlciIsImJ1ZmZlciIsIkJ1ZmZlciIsImZyb20iLCJ3ZWJwQnVmZmVyIiwid2VicCIsInF1YWxpdHkiLCJ0b0J1ZmZlciIsInBhdGhQYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwiam9pbiIsInVwbG9hZEVycm9yIiwic3RvcmFnZSIsInVwbG9hZCIsImNvbnRlbnRUeXBlIiwidXBzZXJ0IiwiY29uc29sZSIsIm1lc3NhZ2UiLCJkYXRhIiwicHVibGljVXJsIiwiZ2V0UHVibGljVXJsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2FUsers%2Fnfscars001%2FDocuments%2FGitHub%2FNatalie_Me%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnfscars001%2FDocuments%2FGitHub%2FNatalie_Me&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2FUsers%2Fnfscars001%2FDocuments%2FGitHub%2FNatalie_Me%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnfscars001%2FDocuments%2FGitHub%2FNatalie_Me&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_nfscars001_Documents_GitHub_Natalie_Me_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/upload/route.ts */ \"(rsc)/./app/api/upload/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload/route\",\n        pathname: \"/api/upload\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload/route\"\n    },\n    resolvedPagePath: \"/Users/nfscars001/Documents/GitHub/Natalie_Me/app/api/upload/route.ts\",\n    nextConfigOutput,\n    userland: _Users_nfscars001_Documents_GitHub_Natalie_Me_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjZfcmVhY3QtZG9tQDE5LjIuNV9yZWFjdEAxOS4yLjVfX3JlYWN0QDE5LjIuNS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm5mc2NhcnMwMDElMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZOYXRhbGllX01lJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm5mc2NhcnMwMDElMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZOYXRhbGllX01lJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNxQjtBQUNsRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25mc2NhcnMwMDEvRG9jdW1lbnRzL0dpdEh1Yi9OYXRhbGllX01lL2FwcC9hcGkvdXBsb2FkL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91cGxvYWQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91cGxvYWRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VwbG9hZC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9uZnNjYXJzMDAxL0RvY3VtZW50cy9HaXRIdWIvTmF0YWxpZV9NZS9hcHAvYXBpL3VwbG9hZC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2FUsers%2Fnfscars001%2FDocuments%2FGitHub%2FNatalie_Me%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnfscars001%2FDocuments%2FGitHub%2FNatalie_Me&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "sharp":
/*!************************!*\
  !*** external "sharp" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("sharp");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5","vendor-chunks/@supabase+auth-js@2.103.3","vendor-chunks/@supabase+postgrest-js@2.103.3","vendor-chunks/@supabase+storage-js@2.103.3","vendor-chunks/@supabase+realtime-js@2.103.3","vendor-chunks/@supabase+phoenix@0.4.0","vendor-chunks/@supabase+supabase-js@2.103.3","vendor-chunks/tslib@2.8.1","vendor-chunks/iceberg-js@0.8.1","vendor-chunks/@supabase+functions-js@2.103.3"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.6_react-dom@19.2.5_react@19.2.5__react@19.2.5/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2FUsers%2Fnfscars001%2FDocuments%2FGitHub%2FNatalie_Me%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnfscars001%2FDocuments%2FGitHub%2FNatalie_Me&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();