export default function ({
  isHMR,
  app: { i18n, $cookies },
  store,
  route,
  params,
  req,
  error,
  redirect,
}) {
  if (isHMR) {
    // ignore if called from hot module replacement
    return
  }
  if (req) {
    if (route.name) {
      // Get locale from cookie or from useragend
      const headersLocale =
        req.headers['accept-language']
          ?.split(',')[0]
          ?.toLocaleLowerCase()
          ?.substring(0, 2) || 'en'

      const locale = $cookies.get('locale') || headersLocale

      store.commit('setLang', locale)
      i18n.locale = store.state.locale
    }
  }
}
