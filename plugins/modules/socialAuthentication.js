import hello from 'hellojs'

hello.init(
  {
    facebook: process.env.VUE_APP_FACEBOOK_ID,
    google: process.env.VUE_APP_GOOGLE_ID,
  },
  {
    redirect_uri: '/callback',
  }
)

export default ({ app, $axios }, inject) =>
  inject('socialLoginService', (provider) =>
    hello(provider).login({
      scope: 'email',
    })
  )
