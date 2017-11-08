(function() {
    'use strict';

    var strings = document.getElementById('strings');
    var topicHeaders = document.querySelectorAll('.privacy-body .content-girdle > section');

    /**
     * Adds the data choices widget(Firefox only) to the first sub-section under
     * "Firefox by default shares data to".
     * @param {Object} section - The section to which the widget
     * will be added
     */
    function addDataChoicesWidget(section) {
        var container = document.createElement('div');
        var copyContainer = document.createElement('p');
        var button = document.createElement('button');

        container.setAttribute('class', 'data-choices');

        copyContainer.textContent = strings.dataset.choicesCopy;

        button.textContent = strings.dataset.choicesButton;
        button.setAttribute('id', 'choose');
        button.setAttribute('type', 'button');

        container.appendChild(copyContainer);
        container.appendChild(button);

        section.appendChild(container);

        // handle clicks on the data choices "Choose" button
        $('#choose').on('click', function() {
            // if the uitour did not load, just return
            if (Mozilla.UITour === undefined) {
                return;
            }

            Mozilla.UITour.openPreferences('privacy-reports');
        });
    }

    // Ensure this is Fx,
    if (Mozilla.Client.isFirefoxDesktop) {
        var initialTopic = topicHeaders[0].querySelector('section');
        var initialTopicContent = initialTopic.querySelector('div');

        // and that the UITour works
        Mozilla.UITour.ping(function() {
            addDataChoicesWidget(initialTopicContent);
        });
    }

})();
