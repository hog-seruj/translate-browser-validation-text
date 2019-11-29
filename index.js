Drupal.behaviors.formValidationTranslate = {
  attach: function (context) {
    var elements = [
      {
        el: context.querySelectorAll('.form-text.required'),
        languages: { // Language key must be the same as in Drupal.
          fi: 'Ole hyvä ja täydennä kenttä',
          et: 'Palun täida väli',
          lt: 'Prašome užpildyti šį laukelį',
          lv: 'Lūdzu, aizpildiet',
          en: 'Please fill in this field'
        },
        text: Drupal.t('Please fill in this field'),
        textFormat: Drupal.t('The format is not correct'),
        type: 'text'
      },
      {
        el: context.querySelectorAll('.form-email.required'),
        languages: { // Language key must be the same as in Drupal.
          fi: 'Ole hyvä ja täydennä kenttä',
          et: 'Palun täida väli',
          lt: 'Prašome užpildyti šį laukelį',
          lv: 'Lūdzu, aizpildiet.',
          en: 'Please fill in this field'
        },
        text: Drupal.t('Please fill in this field'),
        type: 'email'
      },
      {
        el: context.querySelectorAll('.form-date'),
        languages: { // Language key must be the same as in Drupal.
          fi: 'Anna kelvollinen arvo. Kenttä on epätäydellinen tai päivämäärä on virheellinen',
          et: 'Sisestage kehtiv väärtus. Väli on puudulik või selle kuupäev on vale',
          lt: 'Įveskite teisingą vertę. Laukas neišsamus arba jame nurodyta neteisinga data',
          lv: 'Lūdzu, ievadiet derīgu vērtību. Lauks ir nepilnīgs vai tajā nav norādīts datums',
          en: 'Please enter a valid value. The field is incomplete or has an invalid date'
        },
        text: Drupal.t('Please enter a valid value. The field is incomplete or has an invalid date'),
        type: 'date'
      }
    ];
    for (var i = 0; i < elements.length; i++) {
      this.init(elements[i].el, elements[i].text, elements[i].textFormat, elements[i].type);
    }
  },
  init: function (el, text, textFormat, type) {
    this.customValidation(el, text, textFormat, type);
  },
  translate: function (el, languages) {
    for (var thisLanguage in languages) {
      if (drupalSettings.path.currentLanguage === thisLanguage) {
        this.customValidation(el, languages[thisLanguage]);
      }
    }
  },
  customValidation: function (elements, text, textFormat, type) {
    [].forEach.call(elements, function (el) {
      el.oninvalid = function (e) {
        e.target.setCustomValidity("");
        if (type === 'text') {
          if (e.target.validity.valueMissing) {
            e.target.setCustomValidity(text);
          }
          if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity(textFormat);
          }
        }
        else if (type === 'email') {
          let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (e.target.validity.valueMissing) {
            e.target.setCustomValidity(text);
          }
          else if (!reg.test(String(el.value).toLowerCase())) {
            let patternText = Drupal.t('Please correct the email address field, since @value does not have the right format "name@domain.com".', {'@value': el.value});
            e.target.setCustomValidity(patternText);
            inputValue = el.value;
          }
        }
        else if (type === 'date') {
          if (e.target.validity.badInput) {
            e.target.setCustomValidity(text);
          }
          if (e.target.validity.rangeUnderflow) {
            let minText = Drupal.t('Value must be @value or later', {'@value': el.getAttribute('min')});
            e.target.setCustomValidity(minText);
          }
          if (e.target.validity.rangeOverflow) {
            let maxText = Drupal.t('Value must be @value or earlier', {'@value': el.getAttribute('max')});
            e.target.setCustomValidity(maxText);
          }
        }
      };
    });
  }
};