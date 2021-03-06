define(['backbone.marionette','Templates'],function(marionette,templates){

     var NavbarView = marionette.View.extend({
	 	el : "#navbar",
        template:_.template(templates.navbarItemView),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template);
        }
    });
    return NavbarView;
})