'use strict';

/*export default function() {
  return function(hook) {
    let categories = hook.result.categories;

    categories.map(function(category, index) {
      let cleanConv = category.get({ plain: true });
      cleanConv.links = {
        "doctors": "/api/v1/doctors?categoryId=" + category.id
      };
      category = cleanConv;
    });

    hook.result.categories = categories;
  };
}*/

module.exports = function() {
  return function(hook) {
    let category = hook.data;
    console.log(category);
    console.log(hook.app.get('models').categories_i18n);

    // categories.map(function(category, index) {
    //   let cleanConv = category.get({ plain: true });
    //   cleanConv.links = {
    //     "doctors": "/api/v1/doctors?categoryId=" + category.id
    //   };
    //   category = cleanConv;
    // });

    //hook.result.categories = categories;
  };
};
