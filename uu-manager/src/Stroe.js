const Name = 'user_list'
export default {
  fetch: function () {
    return JSON.parse(window.localStorage.getItem(Name) || '[]')
  },
  save: function (items) {
    window.localStorage.setItem(Name, JSON.stringify(items))
  }
}
