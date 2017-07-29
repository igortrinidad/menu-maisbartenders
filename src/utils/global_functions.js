export default function(){
    //Submenu
    $('body').on('click', '.sub-menu > a', function(e){
        e.preventDefault();
        $(this).next().slideToggle(200);
        $(this).parent().toggleClass('toggled');
    });

    // wait for click in document to dispatch a click in menu button to close it
    // this will not close menu if click to open subitems in menu
    $(document).on('click', (event) => {
        if (
            event.target.id !== 'navbar-menu-button'
            && event.target.id !== 'side-menu-global-id'
            && !$(event.target).hasClass('sub-menu')
            || event.target.id == 'side-menu-bg'
        ) {
            if ($('#side-menu-global-id').hasClass('active')) {
                $('#navbar-menu-button').click()
            }
        }
    })


//Retorna o index de um array baseado em um identificador (ex. 1 *id) e uma ancora (ex. ID)
Array.prototype.indexFromAttr = function arrayObjectIndexOf(anchor, identifier) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][anchor] === identifier) {
            return i
        }
    }
    return -1;
}

//Retorna o objeto de um array baseado em um identificador (ex. 1 *id) e uma ancora (ex. ID)
Array.prototype.findFromAttr = function arrayObjectIndexOf(anchor, identifier) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][anchor] === identifier) {
            return this[i];
        }
    }
    return false;
}

//Retorna um boolean de um array baseado em um identificador (ex. 1 *id) e uma ancora (ex. ID)
Array.prototype.checkFromAttr = function arrayObjectIndexOf(anchor, identifier) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][anchor] === identifier) {
            return true;
        }
    }
    return false;
}

//Retorna um boolean de um array baseado em um identificador (ex. 1 *id) e uma ancora (ex. ID)
Array.prototype.checkIfContains = function arrayObjectIndexOf(obj) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

//Remove um objeto de um array localizado por um identificador passado
Array.prototype.removeFromAttr = function arrayObjectIndexOf(anchor, identifier) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][anchor] === identifier) {
            this.splice(i, 1);
            return true
        }
    }
    return false;
}

//Remove um objeto de um array localizado por um identificador passado
Array.prototype.removeFromObj = function arrayObjectIndexOf(object) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] === object) {
            this.splice(i, 1);
            return true
        }
    }
    return false;
}

//Remove um objeto de um array localizado por dois identificadores e duas ancoras.
Array.prototype.removeFromTwoAttr = function arrayObjectIndexOf(anchor, identifier, anchor2, identifier2) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][anchor] === identifier && this[i][anchor2] === identifier2) {
            this.splice(i, 1);
            return true
        }
    }
    return false;
}

//Retorna o objeto de um array baseado em DOIS identificador (ex. 1 *id) e uma ancora (ex. ID)
Array.prototype.findFromTwoAttr = function arrayObjectIndexOf(anchor, identifier, anchor2, identifier2) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][anchor] === identifier && this[i][anchor2] === identifier2) {
            return this[i];
        }
    }
    return false;
}

//Toggle determinado atributo entre true e false de um array localizado pelo identificador passado
Array.prototype.toggleFromAttr = function arrayObjectIndexOf(anchor, identifier, toggled) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][anchor] === identifier) {
            if(this[i][toggled]){
                this[i][toggled] = false;
            } else {
                this[i][toggled] = true;
            }
            return true
        }
    }
    return false;
}

//Altera um atributo localizado pelo identificador passado
Array.prototype.changeFromAttr = function arrayObjectIndexOf(anchor, identifier, attr, newVal) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][anchor] === identifier) {

                this[i][attr] = newVal;

            return true
        }
    }
    return false;
}

//Soma um atributo dentro do array localizado através de um atributo, que pode ser id ou um toggle
Array.prototype.applySumFromAttrInArray = function arrayObjectIndexOf(anchor, identifier, attrToSum) {
    var value = 0;
    for (var i = 0, len = this.length; i < len; i++) {
        
        if (this[i][anchor] === identifier) {
                value = value + this[i][attrToSum];
        }
    }
        return value;
}

//Soma um atributo dentro do array
Array.prototype.sumAttrInArray = function arrayObjectIndexOf(attrToSum) {
    var value = 0;
    for (var i = 0, len = this.length; i < len; i++) {
        
        value = value + this[i][attrToSum];

    }
        return value;
}



}