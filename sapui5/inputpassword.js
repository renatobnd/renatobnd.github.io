(function() {
    let _shadowRoot;
    let _id;
    let _password;

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
        <style>
        </style>
        <div id = "ui5_content" name = "ui5_content">
            <slot name = "content"> </slot>
        </div>

        <script id="oView" name="oView" type="sapui5/xmlview">
            <mvc:View
                controllerName = "myView.Template"
                xmlns:l="sap.ui.layout"
                xmlns:mvc="sap.ui.core.mvc"
                xmlns="sap.m">
                <l:VerticalLayout
                    class="sapUiContentPadding"
                    width="100%">
                    <l:content>
                    <Input
                        id="passwordInput"
                        type="Password"
                        placeholder="Enter password..!" liveChange="onButtonPress"/>
                    </l:content>
                </l:VerticalLayout>
            </mvc:View>
        </script>                
    `;

    class InputPassword extends HTMLElement {
        constructor() {
            super();

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));
            _id = createGuid();
            _shadowRoot.querySelector("#oView").id = _id + "_oView";

            this._export_settings = {};
            this._export_settings.password = "";

            this.addEventListener("click", event => {
                console.log('click');
            });
        }
    
    _firePropertiesChanged() {
        this.password = "";
        this.dispatchEvent(new CostumEvent("propertiesChanged", {
            detail: {
                properties: {
                    password : this.password
                }
            }
        }));
    } 
    
    //Setting

    get password() {
        return this._export_settings.password;
    }
    
    set password(value) {
        value = _password;
        this._export_settings.password = value;
    }

    static get observedAttributes() {
        return [
            "password"
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != newValue) {
            this[name] = newValue;
        }
    }
}
customElements.define("com-sap-sac-inputpassword", InputPassword);

function loadthis(that) {
    var that_ = that;

    let content = document.createElement('div');
    content.slot = "content";
    that_.appendChild(content);

    sap.ui.getCore().attachInit(function() {
        "use strict";

        //## Controller ##
        sap.ui.define([
            "jquery.sap.global",
            "sap/ui/core/mvc/Controller"
        ], function(jQuery, Controller) {
            "use strict";

            return Controller.extend("myView.Template", {
                onButtonPress: function(oEvent) {
                    _password = oView.byId("passwordInput").getValue();
                    that._firePropertiesChanged();
                    console.log(_password);

                    this.settings = {};
                    this.settings.password = "";

                    that.dispatchEvent(new CustomEvent("onStart", {
                        detail: {
                            settings: this.settings
                        }
                    }));
                } 
            });
        });

        //### the app: place the xmlView somewhere  into DOM ###
        var oView = sap.ui.xmlview({
            viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
        });
        oView.placeAt(content);

        if(that_._designMode) {
            oView.byId("passwordInput").setEnabled(false);
        }
     });

}

})
