Drupal.behaviors.formValidationTranslate = {
  attach: function (context) {
    var elements = [
      {
        el: context.querySelectorAll('.form-text.required'),
        languages: { // Language key must be the same as in Drupal.
          fi: 'Ole hyvä ja täydennä kenttä',
          et: 'Palun täida väli',
          en: 'Please fill in this field'
        }
      },
      {
        el: context.querySelectorAll('form-email.required'),
        languages: { // Language key must be the same as in Drupal.
          fi: 'Ole hyvä ja täydennä kenttä',
          et: 'Palun täida väli',
          en: 'Please fill in this field'
        }
      },
    ];
    for (var i = 0; i < elements.length; i++) {
      this.init(elements[i].el, elements[i].languages);
    }
  },
  init: function (el, languages) {
    this.translate(el, languages);
  },
  translate: function (el, languages) {
    for (var thisLanguage in languages) {
      if (drupalSettings.path.currentLanguage === thisLanguage) {
        this.addCustomValidationText(el, languages[thisLanguage]);
      }
    }
  },
  addCustomValidationText: function (elements, text) {
    [].forEach.call(elements, function (el) {
      el.oninvalid = function (e) {
        e.target.setCustomValidity("");
        if (!e.target.validity.valid) {
          e.target.setCustomValidity(text);
        }
      };
    });
  }
};