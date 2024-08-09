interface AutoResizeTextareaOptions {
    maxHeight?: number;
}

interface AutoResizeTextareaElement extends HTMLTextAreaElement {
    autoResizeTextarea: {
        initialHeight: number;
        initialScrollHeight: number;
    };
}

type AutoResizeTextareaElements = AutoResizeTextareaElement[];

export const autoResizeTextarea = function (elements: AutoResizeTextareaElements, options: AutoResizeTextareaOptions) {
    var config: AutoResizeTextareaOptions = {
        maxHeight: Infinity,
    };

    for (var option in options) {
        config[option as keyof AutoResizeTextareaOptions] = options[option as keyof AutoResizeTextareaOptions];
    }

    for (var i = 0; i < elements.length; i++) {
        forEachElement(elements[i]);
    }

    function elementHeight(element: HTMLElement): number {
        return parseFloat(
            getComputedStyle(element, null).height.replace("px", "")
        );
    }

    function initInternal(element: AutoResizeTextareaElement) {
        var initialDisplay = element.style.display;
        element.style.display = "block"; // prevent display="none"
        //element.autoResizeTextarea.initialHeight = elementHeight(element);
        element.autoResizeTextarea.initialHeight = elementHeight(element);
        element.autoResizeTextarea.initialScrollHeight = parseFloat(
            element.scrollHeight.toString()
        );

        if (
            element.autoResizeTextarea.initialScrollHeight >
            element.autoResizeTextarea.initialHeight
        ) {
            element.autoResizeTextarea.initialHeight =
                element.autoResizeTextarea.initialScrollHeight + 2;
        }

        element.style.height = element.autoResizeTextarea.initialHeight + "px";
        element.style.display = initialDisplay;
    }

    function init(element: AutoResizeTextareaElement) {
        element.autoResizeTextarea = {
            initialHeight: 0,
            initialScrollHeight: 0
        };
        initInternal(element);
        updateElement(element);

        if (!element.autoResizeTextarea.initialHeight) {
            // try again, element might take longer to render
            setTimeout(function () {
                initInternal(element);
                updateElement(element);
            }, 500);
        }
    }

    function updateElement(element: AutoResizeTextareaElement) {
        element.style.height = element.autoResizeTextarea.initialHeight + "px";
        var newHeight =
            element.autoResizeTextarea.initialHeight +
            element.scrollHeight -
            element.autoResizeTextarea.initialScrollHeight;
        newHeight = Math.max(newHeight, element.autoResizeTextarea.initialHeight);

        const maxHeight = config.maxHeight || 0; // Ensure config.maxHeight is defined
        element.style.height = Math.min(newHeight, maxHeight) + "px";

        if (newHeight <= maxHeight) {
            element.style.overflow = "hidden";
        } else {
            element.style.overflow = "auto";
        }
    }

    function forEachElement(element: AutoResizeTextareaElement) {
        init(element);
        element.addEventListener("input", function () {
            updateElement(element);
        });
    }
};
