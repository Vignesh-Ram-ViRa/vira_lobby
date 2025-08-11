
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@features/auth/authSlice'
import themeSlice from '@features/theme/themeSlice'
import bookwormSlice from '@features/bookworm/bookwormSlice'
import bingescapeSlice from '@features/bingescape/bingescapeSlice'
import filmFrenzySlice from '@features/filmFrenzy/filmFrenzySlice'
import otakuHubSlice from '@features/otakuHub/otakuHubSlice'
import wanderlogSlice from '@features/wanderlog/wanderlogSlice'
import scribblesSlice from '@features/scribbles/scribblesSlice'
import shutterTalesSlice from '@features/shutterTales/shutterTalesSlice'
import spotLightSlice from '@features/spotLight/spotLightSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    bookworm: bookwormSlice,
    bingescape: bingescapeSlice,
    filmFrenzy: filmFrenzySlice,
    otakuHub: otakuHubSlice,
    wanderlog: wanderlogSlice,
    scribbles: scribblesSlice,
    shutterTales: shutterTalesSlice,
    spotLight: spotLightSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

// Export types for TypeScript usage (commented out for JS)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
