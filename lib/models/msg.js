// used for notificiations (form submission errors/success, etc.)

module.exports = {
  namespace: 'msg',
  state: {
    content: null,
    type: null
  },
  reducers: {
    remove: function (state) {
      return {
        content: null,
        type: null
      };
    },
    update: function (state, msg) {
      return {
        content: msg.content,
        type: msg.type
      };
    }
  }
}
