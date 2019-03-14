class AppStorage {
  constructor ( key, useSeesionStorage = false )  {
    this.key = key
    this.storage = ( useSeesionStorage ) ? window.sessionStorage : window.localStorage
  }

  setValue ( value ) {
    this.storage.setItem( this.key, value )
  }

  getValue () {
    return this.storage.getItem( this.key )
  }
}

export {
  AppStorage
}