Drupal.behaviors.formValidationTranslate = {
  attach: function (context) {
    var elements = [
      {
        el: context.querySelectorAll('.form-text.required'),
        languages: { // Language key must be the same as in Drupal.
          fi: 'Ole hyvä ja täydennä kenttä',
          et: 'Palun täida väli',
          en: 'Please fill in this field'
        },
        text: Drupal.t('Please fill in this field'),
        type: 'text'
      },
      {
        el: context.querySelectorAll('.form-email.required'),
        languages: { // Language key must be the same as in Drupal.
          fi: 'Ole hyvä ja täydennä kenttä',
          et: 'Palun täida väli',
          en: 'Please fill in this field'
        },
        text: Drupal.t('Please fill in this field'),
        type: 'email'
      },
    ];
    for (var i = 0; i < elements.length; i++) {
      this.init(elements[i].el, elements[i].text, elements[i].type);
    }
  },
  init: function (el, text, type) {
    this.customValidation(el, text, type);
  },
  translate: function (el, languages) {
    for (var thisLanguage in languages) {
      if (drupalSettings.path.currentLanguage === thisLanguage) {
        this.customValidation(el, languages[thisLanguage]);
      }
    }
  },
  customValidation: function (elements, text, type) {
    [].forEach.call(elements, function (el) {
      el.oninvalid = function (e) {
        e.target.setCustomValidity("");
        if (e.target.validity.valueMissing) {
          e.target.setCustomValidity(text);
        }
        else if (type === 'email') {
          let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!reg.test(String(el.value).toLowerCase())) {
            let patternText = Drupal.t('Please type correctly the email address, @value not equal email format "name@domain.com".', {'@value': el.value});
            e.target.setCustomValidity(patternText);
            inputValue = el.value;
          }
        }
      };
    });
  }
};