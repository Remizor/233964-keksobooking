'use strict';

window.filterApartments = (function () {
  var newApartments = [];
  var filtersSelectId = ['housing_type', 'housing_price', 'housing_room-number', 'housing_guests-number'];
  var filtersFeatureId = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var selectedValues = [];
  var featuresValues = [];
  var LOW_PRICE_LIMIT = 10000;
  var UPPER_PRICE_LIMIT = 50000;
  var VALUE_ANY = 'any';

  function getSelectedValues() {
    filtersSelectId.forEach(function (item) {
      var selectNode = document.querySelector('#' + item);
      if (selectNode !== null) {
        selectedValues.push(selectNode.value);
      }
    });
    filtersFeatureId.forEach(function (item) {
      var featureCheckbox = document.querySelector('#' + item);
      if (featureCheckbox !== null && featureCheckbox.checked) {
        featuresValues.push(featureCheckbox.value);
      }
    });
  }

  function isCorrectPrice(itemPrice) {
    var priceCheck = false;
    switch (selectedValues[1]) {
      case 'low':
        priceCheck = itemPrice < LOW_PRICE_LIMIT;
        break;

      case 'middle':
        priceCheck = itemPrice >= LOW_PRICE_LIMIT && itemPrice <= UPPER_PRICE_LIMIT;
        break;

      case 'high':
        priceCheck = itemPrice > UPPER_PRICE_LIMIT;
        break;

      default:
        priceCheck = true;
    }
    return priceCheck;
  }

  function isCorrectField(itemField, selectIdIndex) {
    return selectedValues[selectIdIndex] === VALUE_ANY || selectedValues[selectIdIndex] === itemField;
  }

  function isCorrectFeature(itemFeatures) {
    function isFeatureInApartment(feature) {
      return itemFeatures.indexOf(feature) !== -1;
    }
    return featuresValues.every(isFeatureInApartment);
  }

  function isCorrect(apartmentData) {
    return isCorrectPrice(apartmentData.offer.price) &&
      isCorrectField(apartmentData.offer.type, 0) &&
      isCorrectField(apartmentData.offer.rooms.toString(), 2) &&
      isCorrectField(apartmentData.offer.guests.toString(), 3) &&
      isCorrectFeature(apartmentData.offer.features);
  }

  return function (allApartments) {
    newApartments = [];
    selectedValues = [];
    featuresValues = [];
    getSelectedValues();
    newApartments = allApartments.filter(isCorrect);
    return newApartments;
  };
})();
