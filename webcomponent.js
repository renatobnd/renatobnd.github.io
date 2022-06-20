(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    `;

    customElements.define('com-sap-sample-helloworld3', class HelloWorld extends HTMLElement {


		constructor() {
		    super();
		    this._shadowRoot = this.attachShadow({mode: "open"});
		    this._shadowRoot.appendChild(template.content.cloneNode(true));
		    this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
		    e.preventDefault();
		    this.dispatchEvent(new CustomEvent("propertiesChanged", {
			    detail: {
				properties: {
				    widgetText: this.widgetText
				}
			    }
		    }));
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();       
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
                      this.redraw();
            }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default
        /*
        onCustomWidgetResize(width, height){
        
        }
        */

        //Getters and Setters
        get widgetText() {
            return this._tagType;
        }

        set widgetText(value) {
            this._tagText = value;
        }
        // End - Getters and Setters

        redraw(){
            if (this._tagContainer){
                this._tagContainer.parentNode.removeChild(this._tagContainer);
            }

            var shadow = window.getSelection(this._shadowRoot);
            this._tagContainer = document.createElement(this._tagType);
            var theText = document.createTextNode(this._tagText);    
            this._tagContainer.appendChild(theText); 
            this._shadowRoot.appendChild(this._tagContainer);
        }
    
    
    });
        
})();
