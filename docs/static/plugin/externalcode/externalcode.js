/**
 *  Copyright 2015 Paul Querna
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

(function(){
	function slidify(section, code) {
		section.textContent = code;
		if (window["hljs"] !== undefined) {
			hljs.highlightBlock(section);			
		} else if (window['Rainbow'] !== undefined) {
			Rainbow.color(section);
		}
	}

	function fetchSection(section) {
		var xhr = new XMLHttpRequest(),
			url = section.getAttribute('data-code')
			done = false;

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
				slidify(section,  xhr.responseText);
				done = true;
			} else if (!done) {
				section.innerHTML = '<section data-state="alert">' +
					'ERROR: The attempt to fetch ' + url + ' failed with HTTP status ' + xhr.status + '. ' +
					'Check your browser\'s JavaScript console for more details.' +
					'<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>' +
					'</section>';
			}
		}

		xhr.overrideMimeType('text/html; charset=utf-8');

		xhr.open('GET', url, true);

		try {
			xhr.send();
		}
		catch ( e ) {
			alert('Failed to get the Code file ' + url + '. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ' + e);
		}

	}

	function processSlides() {
		var sections = document.querySelectorAll( '[data-code]'),
			section;

		for( var i = 0, len = sections.length; i < len; i++ ) {
			section = sections[i];
			if (section.getAttribute('data-code').length) {
				fetchSection(section);
			}
		}
	}

	processSlides();
})();
