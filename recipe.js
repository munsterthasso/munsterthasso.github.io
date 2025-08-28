function roundToNearest25(value) {
    return Math.round(value / 25) * 25;
}

function roundToInteger(value) {
    return Math.round(value);
}

function roundToHalf(value) {
    return Math.round(value * 2) / 2;
}

function updateIngredient(element, scale) {
    const base = parseFloat(element.dataset.base);
    const unit = element.dataset.unit;
    const unitPlural = element.dataset.unitPlural;
    const roundTo = parseFloat(element.dataset.roundto);

    let scaledValue = base * scale;
    let displayValue = Math.round(scaledValue / roundTo) * roundTo;

    let displayText;
    const fractionalPart = displayValue % 1;
    const wholePart = Math.floor(displayValue);

    if (Math.abs(fractionalPart - 0.25) < 0.001) {
        displayText = wholePart === 0 ? "¼" : wholePart + "¼";
    } else if (Math.abs(fractionalPart - 0.5) < 0.001) {
        displayText = wholePart === 0 ? "½" : wholePart + "½";
    } else if (Math.abs(fractionalPart - 0.75) < 0.001) {
        displayText = wholePart === 0 ? "¾" : wholePart + "¾";
    } else {
        displayText = displayValue.toString();
    }

    let finalUnit = unit;
    if (unitPlural && displayValue !== 1) {
        finalUnit = unitPlural;
    }

    if (unit === 'g' || unit === 'ml') {
        element.textContent = displayText + finalUnit;
    } else {
        element.textContent = displayText + ' ' + finalUnit;
    }
}

function setupRecipeScaling(scaleId, valueId, recipeSelector) {
    const slider = document.getElementById(scaleId);
    const valueDisplay = document.getElementById(valueId);

    slider.addEventListener('input', function() {
        const scale = parseFloat(this.value);
        valueDisplay.textContent = scale.toFixed(1) + 'x';

        const ingredients = document.querySelectorAll(recipeSelector + ' [data-base]');
        ingredients.forEach(ingredient => {
            updateIngredient(ingredient, scale);
        });
    });
}
