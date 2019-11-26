/*
    ----------------Simple----------------
    Discription: Use JavaScript but simply.
    Version: 12
    Created By: JoeTheHobo (John Jones)
    Email: johnjonesma@gmail.com
    Release Date: 
*/

//Functions
function onLoad(func) {
    var callback = function(){
        func();
    };
    if (
        document.readyState === "complete" ||
        (document.readyState !== "loading" && !document.documentElement.doScroll)
    ) {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
}
function hasNumber(myString) {
    return /\d/.test(myString);
}
function $(c,b = document) {
    if (typeof c === 'function') onLoad(c);
    else if (c.includes(' ')) return c.split(' ').map(x => $(x)).flatArray();
    else {
        if(!'#.<'.includes(c.charAt(0))) c = '#' + c;
        if (c.charAt(0) == '<') c = c.charAt(c.length-1) == '>' ? c.substring(1,c.length-1) : c.substring(1,c.length);
        let a = b.querySelectorAll(c);
        return a.length == 1 ? (a[0]) : (a.length == 0 ? false : a);
    }
}
function rnd(type) {
    if (Array.isArray(type)) return type[rnd(type.length) - 1];
    if (!isNaN(type)) return Math.floor(Math.random() * type) + 1;
    if (typeof type == 'string') return type.charAt(rnd(type.length) - 1);
}
function keyDown(a,b,from = document.body) {
    if (typeof a !== 'string') {
        from.addEventListener('keydown',function(e,from) {
            a(e,from);
        })
    } else {
        from.addEventListener('keydown',function(e,from) {
            if (e.key == a) b(from);
        })
    }
}
function keyUp(a,b,from = document.body) {
    if (typeof a !== 'string') {
        from.addEventListener('keyup',function(e,from) {
            a(e,from);
        })
    } else {
        from.addEventListener('keyup',function(e,from) {
            if (e.key == a) b(from);
        })
    }
}
function trimStyle(style) {
    if(hasNumber(style)) {
        let toReturn = '';
        for (let i = 0; i < style.length; i++) {
            if (Number(style.charAt(i)) || style.charAt(i) == '0') toReturn += style.charAt(i);
        }
        return Number(toReturn);
    } else return style;
}
function isNumber(num) {
    return isNaN(num) ? false : true;
}
function animate(elem,style,toWhat,speed) {
    let pos = eval('elem.style.' + style).trimStyle();
    var id = setInterval(frame, speed);
    function frame() {
      if (pos == (toWhat + 'px').trimStyle()) {
        clearInterval(id);
      } else {
        (toWhat + 'px').trimStyle() > eval('elem.style.' + style).trimStyle() ? pos++ : pos--;
        pos += 'px';
        let b = elem.style;
        eval('b.' + style + ' = pos');
        pos = pos.trimStyle();
      }
    }
}
function log() {
    let a = '';
    arguments.map(b => a += b + ' ');
    console.log(a);
}
function setFavicon(url) {
    var links=$('<link');
    var head=document.getElementsByTagName('head')[0];
    for(var i=0; i<links.length; i++) {
        if(links[i].getAttribute('rel')==='icon') {
            head.removeChild(links[i])
        }         
    }
    head.create('link').TYPE('image/x-icon').REL('icon').HREF(url);
}
function setTitle(txt) {
    var titles = $('<title');
    var head = document.getElementsByTagName('head')[0];
    for(var i=0; i<titles.length; i++)
    {
        head.removeChild(titles[i])       
    }
    var title = document.head.create('title');
    title.HTML(txt);
}
function shuffle(a) {
    if (Array.isArray(a)) {
        return a.sort(() => Math.random() - 0.5);
    }
    if (!isNaN(a)) {
        a = a + '';
        a = a.split('');
        a = a.sort(() => Math.random() - 0.5);
        a = a.join("");
        return Number(a);
    }
    if (typeof type == 'string') {
        a = a.split(""),
        a = a.sort(() => Math.random() - 0.5);
        return a.join("");
    }
}

//Array prototypes
Array.prototype.rnd = function() { return rnd(this) }
Array.prototype.flatArray = function() {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        let use = this[i];
        if (use.length > 1) use = use.flatArray(); 
        newArr = newArr.concat(use);
        
    }
    return newArr;
}
Array.prototype.total = function(tot = 0) {
	for (var i = 0; i < this.length; i++) {
		tot += this[i];
	}
	return tot;
}
Array.prototype.avg = function() {
	return this.total() / this.length;
}
Array.prototype.highest = function(high = null) {
	for (var i = 0; i < this.length; i++) {
		if (high == null)
			high = this[i];
		else {
			if (this[i] > high)
				high = this[i];
		}
	}
	return high;
}
Array.prototype.lowest = function(low = null) {
	for (var i = 0; i < this.length; i++) {
		if (low == null)
			low = this[i];
		else {
			if (this[i] < low)
				low = this[i];
		}
	}
	return low;
}
Array.prototype.shuffle = function() { return shuffle(this) }

//String prototypes
String.prototype.rnd = function() { return rnd(this) }
String.prototype.trimStyle = function() { return trimStyle(this) }
String.prototype.shuffle = function() { return shuffle(this) }
//Number prototypes
Number.prototype.rnd = function() { return rnd(Number(this)) }
Number.prototype.shuffle = function() { return shuffle(this) }

//Object prototypes

Object.prototype.keyUp = function(a,b) {
    keyUp(a,b,this);
    return this;
}
Object.prototype.keyDown = function(a,b) {
    keyDown(a,b,this);
    return this;
}
Object.prototype.$ = function(id) { return $(id,this) };
Object.prototype.$P = function(amt = 1,a = this) { 
    for (var i = 0; i < amt; i++) {
        a = a.parentNode;
    }
    return a;
}
Object.prototype.map = function(func,para) { for (let i = 0; i < this.length; i++) { func(this[i],para); }}
Object.prototype.hide = function(type = 'none') {
    this.show(type);
    return this;
}
Object.prototype.show = function(type = 'block') {
    this.length ? this.map(x => x.show(type)) : this.style.display = type;
    return this;
}
Object.prototype.HTML = function(html = null) {
    if (html !== null) {
        this.length ? this.map(x => x.html(html)) : this.innerHTML = html;
        return this;
    } else return this.innerHTML;
}
Object.prototype.SRC = function(src) {
    this.length ? this.map(x => x.SRC(src)) : this.src = src;
    return this;
}
Object.prototype.css = function(obj) {
    if (typeof obj !== 'string') {
        let entries = Object.entries(obj);
        for (let i = 0; i < entries.length; i++) {
            let key = entries[i][0];
            let info = entries[i][1];
            let b = this.style;
            let allow = ['minWidth','minHeight','padding','maxWidth','maxHeight','marginRight','marginBottom','marginLeft','marginTop','fontSize','lineHeight','margin','width','height','borderRadius','left','top','bottom','right'];
            if (typeof info == 'number' && ( allow.includes(key) )) info = info + 'px';
            if (this.length) this.map(x => x.css(obj));
            else eval('b.' + key + ' = info')
        }
        return this;
    } else if (typeof obj == 'string') {
        if (this.length) {
            let c = [];
            this.map(x => c.push(x.css(obj)));
            return c;
        } else {
            let b = this.style;
            return eval('b.' + obj);
        }
    }
}
Object.prototype.flatArray = function() {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        let use = this[i];
        if (use.length > 1) use = use.flatArray(); 
        newArr = newArr.concat(use);
        
    }
    return newArr;
}
Object.prototype.clicked = function(func) {
    this.length ? this.map(x => x.clicks(func)) : this.addEventListener('click',func);
    return this;
}
Object.prototype.create = function(elem,x = null) {
	let ele = document.createElement(elem);
	if (x !== null) this.insertBefore(ele,this.children[x]);
	else this.appendChild(ele);
	return ele;
}
Object.prototype.on = function(what,func) {
    this.length ? this.map(x => x.on(what,func)) : this.addEventListener(what,func);
    return this;
}
Object.prototype.toggle = function(style = 'display', a = 'none', b = 'block') {
    if (this.length) {
        this.map(x => x.toggle(style,a,b));
    } else {
        let c = this.style;
        if(eval("c." + style + '== a')) {
            eval("c." + style + '= b');
        } else {
            eval("c." + style + '= a');
        }
    }
    return this;
}
Object.prototype.transition = function(obj,speed) {
    let entries = Object.entries(obj);
    for (let i = 0; i < entries.length; i++) {
        let key = entries[i][0];
        let info = entries[i][1];
        if (this.length) this.map(x => x.transition(obj,speed));
        else animate(this,key,info,speed);
    }
    return this;
}
Object.prototype.toTable = function() {
	this.css({display: 'table'})
	return this;
}
Object.prototype.addRow = function(x) {
	let newT = this.create('div',x);
    newT.style.display = 'table-row';
	return newT;
}
Object.prototype.addCell = function(x) {
	let newT = this.create('div',x);
	newT.style.display = 'table-cell';
	return newT;
}
Object.prototype.placeHolder = function(txt) {
    this.length ? this.map(x => x.placehikder(txt)) : this.placeholder = txt;
    return this;
}
Object.prototype.autoComplete = function(txt) {
    this.length ? this.map(x => x.autoComplete(txt)) : this.autocomplete = txt;
    return this;
}
Object.prototype.hover = function(func,func2) {
    this.on('mouseover',func);
    this.on('mouseleave',func2);
    return this;
}
Object.prototype.CLASS = function(name) {
    this.length ? this.map(x => x.CLASS(name)) : this.className = name;
    return this;
}
Object.prototype.ID = function(name) {
    this.length ? this.map(x => x.ID(name)) : this.id = name;
    return this;
}
Object.prototype.HREF = function(txt) {
    this.length ? this.map(x => x.HREF(txt)) : this.href = txt;
    return this;
}
Object.prototype.REL = function(txt) {
    this.length ? this.map(x => x.REL(txt)) : this.rel = txt;
    return this;
}
Object.prototype.TYPE = function(txt) {
    this.length ? this.map(x => x.TYPE(txt)) : this.type = txt;
    return this;
}
Object.prototype.VALUE = function(txt) {
    this.length ? this.map(x => x.VALUE(txt)) : this.value = txt;
    return this;
}


//ELEMENTS prototypes
Element.prototype.insertChildAtIndex = function(child, index) {
    if (!index) index = 0
    if (index >= this.children.length) {
      this.appendChild(child)
    } else {
      this.insertBefore(child, this.children[index])
    }
  }

/*
    Time Object
    time.second() //Returns current second
*/
window.time = {
	second: function() {
		let date = new Date;
		return date.getSeconds();
	},
	minute: function() {
		let date = new Date;
		return date.getMinutes();
	},
	hour: function() {
		let date = new Date;
		return date.getHours();
	},
	year: function() {
		let date = new Date;
		return date.getFullYear();
	},
	month: function() {
		let date = new Date;
		let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		return months[date.getMonth()];
	},
	day: function() {
		let date = new Date;
		return date.getDate();
	},
	dayOfWeek: function() {
		let date = new Date;
		let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		return days[date.getDay()];
	},
	millisecond: function() {
		let date = new Date;
		return date.getMilliseconds();
	},
	daysInMonth: function(month) {
		var days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if( (new Date(time.year, 1, 29)).getDate() == 29 ) days_in_month[1] = 29;
		if (typeof month == 'String') {
			let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			return days_in_months[months.indexOf(month)]
		} else {
			return days_in_months[month];
		}
	},
	daysInMonths: function() {
		var days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if( (new Date(time.year, 1, 29)).getDate() == 29 ) days_in_month[1] = 29;
		return days_in_months;
    },
}

class counter {
    constructor() {
        this.count = 0;
        this.interval = null;
        this.start();
    }
    stop = function() {
        clearInterval(this.interval);
        return this.count;
    }
    start = function() {
        let a = this;
        a.interval = setInterval(function() {
            a.count += 0.001;
        },1);
    }
}

window.mouseDown = false;
document.body.onmousedown = () => { mouseDown = true }
document.body.onmouseup = () => { mouseDown = false }

/*Table Class
    Example Code:
    new table(10,10,function(cell) {
        cell.css({
            width: 100,
            height: 100,
            background: 'green'
        })
    })
*/
class table {
    constructor(rows,cols,func = false,create = false) { 
        this.rows = rows;
        this.cols = cols;
        this.func = func;
        if (create) {
            this.create(create)
        }
    }
    create(ele) {
        ele.toTable();
        for (let i = 0; i < this.rows; i++) {
            let row = ele.addRow();
            for (let j = 0; j < this.cols; j++) {
                let cell = row.addCell();
                if (this.func) this.func(cell,i,j);
            }
        }
    }
}

/*
Localstorage! LS object

ls.save(name, value)  -  Save any value (arrays, objects, numbers, strings) to a given name.
ls.get(name, result)  -  Returns the value of the name given, and if it can't find anything returns result.
ls.clear()  -  Deletes all items.
ls.delete(name)  -  Deletes that one item with given name.
ls.log()  -  Logs all the items in your Localstorage.
*/

window.ls = {
    save: function(name,save,open = ":!>@",close = '@>!:',number = 'n!<>', string = 's!<>',stringEnd = '<>!s',object = 'o!<>',objectEnd = '<>!o') {
        if (Array.isArray(save)) {
            localStorage.setItem(name,lsHelpArr(save,open,close,number,string,stringEnd,object,objectEnd));
        } else {
            let toAdd = '';
            if (typeof save == 'string') toAdd = string + save;
            if (typeof save == 'number') toAdd = number + save;
            if (typeof save == 'object') toAdd = object + JSON.stringify(save);
            localStorage.setItem(name, toAdd);
        }
    },
    get: function(name,result = false,open = ":!>@",close = '@>!:',number = 'n!<>', string = 's!<>',stringEnd = '<>!s',object = 'o!<>',objectEnd = '<>!o') {
        if (localStorage.getItem(name) !== null) {
            if (localStorage.getItem(name).includes(open) && localStorage.getItem(name).includes(close)) {
                let a = localStorage.getItem(name);
                return lsHelpArr2(a,open,close,number,string,stringEnd,object,objectEnd); 
            } else {
                let a = localStorage.getItem(name);
                let b = a.substring(4,a.length);
                if (a.substring(0,4) == string) return b;
                if (a.substring(0,4) == number) return Number(b);
                if (a.substring(0,4) == object) return JSON.parse(b);
            }
        } else {
            return result;
        }
    },
    log: function() {
        console.log('----------');
        console.log("LocalStorage:");
        console.log(" ");
        for (var i = 0; i < localStorage.length; i++) {
            console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]")
        }
        console.log('----------');
    },
    delete: function(name) {
        localStorage.removeItem(name);
    },
    clear: function() {
        localStorage.clear();
    }
}
window.ss = {
    save: function(name,save,open = ":!>@",close = '@>!:',number = 'n!<>', string = 's!<>',stringEnd = '<>!s',object = 'o!<>',objectEnd = '<>!o') {
        if (Array.isArray(save)) {
            sessionStorage.setItem(name,lsHelpArr(save,open,close,number,string,stringEnd,object,objectEnd));
        } else {
            let toAdd = '';
            if (typeof save == 'string') toAdd = string + save;
            if (typeof save == 'number') toAdd = number + save;
            if (typeof save == 'object') toAdd = object + JSON.stringify(save);
            sessionStorage.setItem(name, toAdd);
        }
    },
    get: function(name,result = false,open = ":!>@",close = '@>!:',number = 'n!<>', string = 's!<>',stringEnd = '<>!s',object = 'o!<>',objectEnd = '<>!o') {
        if (sessionStorage.getItem(name) !== null) {
            if (sessionStorage.getItem(name).includes(open) && sessionStorage.getItem(name).includes(close)) {
                let a = sessionStorage.getItem(name);
                return lsHelpArr2(a,open,close,number,string,stringEnd,object,objectEnd); 
            } else {
                let a = sessionStorage.getItem(name);
                let b = a.substring(4,a.length);
                if (a.substring(0,4) == string) return b;
                if (a.substring(0,4) == number) return Number(b);
                if (a.substring(0,4) == object) return JSON.parse(b);
            }
        } else {
            return result;
        }
    },
    log: function() {
        console.log('----------');
        console.log("sessionStorage:");
        console.log(" ");
        for (var i = 0; i < sessionStorage.length; i++) {
            console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]")
        }
        console.log('----------');
    },
    delete: function(name) {
        sessionStorage.removeItem(name);
    },
    clear: function() {
        sessionStorage.clear();
    }
}
function lsHelpArr(arr,h,h2,n,s,se,o,oe) {
    let toSet = h;
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            toSet += lsHelpArr(arr[i],h,h2,n,s,se,o,oe);
        } else if (typeof arr[i] == 'object') {
            toSet += o + JSON.stringify(arr[i]) + oe;
        } else {
            let toSet2 = ',';
            let toAdd = '';
            if (i == arr.length - 1) toSet2 = '';
            if (typeof arr[i] == 'number') toAdd = n;
            if (typeof arr[i] == 'string') {
                toAdd = s;
                toSet2 = se + toSet2;
            }
            toSet += toAdd + '' +  arr[i] + '' + toSet2;
        }
    }
    return toSet + h2;
}
function lsHelpArr2(str,h,h2,n,s,se,o,oe) {
    console.log(str);
    let toSet = '';
    for (let i = 0; i < str.length; i++) {
        if (str.substring(i,i + 4) == h) {
            toSet += '[';
            i += 3;
        } else if(str.substring(i,i + 4) == h2) {
            toSet += ']';
            i += 3;
        } else if (str.substring(i,i + 4) == n) {
            i += 3;
        } else if (str.substring(i,i + 4) == s) {
            i += 3;
            toSet += "'";
        } else if (str.substring(i,i + 4) == se) {
            i += 3;
            toSet += "'";
        } else if (str.substring(i,i + 4) == o) {
            i += 3;

        } else if (str.substring(i,i + 4) == oe) {
            i += 3;  
        } else {
            let toAdd = '';
            if (toSet.charAt(toSet.length - 1) == ']') {
                toAdd = ',';
            }
            toSet += toAdd + str[i];
        }
    }
    return eval(toSet);
}

/*
    Example code:
    slog('.[background: green; color: red;]Hello World'); //Out puts a log that says "Hello World" in red with a green background.
*/

window.slog = function() {
    let final = 'console.log(';
    for (let k = 0; k < arguments.length; k++) {
        let texts = [];
        let addons = [];
        let text = '';
        let prev = false;
        let txt = arguments[k] + '';
        if (txt !== '<br>') {
            for (var i = 0; i < txt.length; i++) {
                if (txt.charAt(i) == '.' && txt.charAt(i + 1) == '[') {
                    if (prev) {
                        texts.push(text);
                        text = '';
                    }
                    i += 2;
                    let add = '';

                    for (var j = i; j < txt.length; j++) {
                        if (txt.charAt(j) == ']') {
                            addons.push(add);
                            i = j;
                            j = txt.length;
                        } else {
                            add += txt.charAt(j);
                        }
                    }
                    prev = true;
                } else {
                    text += txt.charAt(i);
                }
            }
            texts.push(text);
            if (addons.length > 0) {
                for (var i = 0; i < texts.length - k; i++) {
                    final += ' "%c' + texts[i] + '" +';
                }
            } else if (k > 0) {
                final += "'" + texts + "''";
            } else {
                final += "'" + texts + "''";
            }
            
            final = final.substring(0, final.length - 1);
            final += ',';
            for (var i = 0; i < addons.length; i++) {
                final += ' "' + addons[i] + '",';
            }		  
            final = final.substring(0, final.length - 1);
            final += ',';
        } else {
            final += `"<br>",`;
        }

    }
    final = final.substring(0,final.length - 1) + ')';
    eval(final);
}
slog.error = (text = '') => {
	slog('.[background: red; font-weight: bold] ERROR: .[background: red;]' + text);
}
slog.warn = (text = '') => {
	slog('.[background: yellow; font-weight: bold; color: black;] WARNING: .[background: yellow; color: black;]'+text);
}
slog.debug = (text = '') => {
	slog('.[background: orange; font-weight: bold; color: black;] DEBUG: .[background: orange; color: black;]'+text);
}

//Credits log (Delete if so wish)
slog('.[margin: -10px;  font-weight: bold;line-height: 18px; background: lightblue; color: black; font-size: 12px] Version: 12 .[background: lightblue;line-height: 22px; color: black; font-weight: bold; margin: 5px;font-size: 16px] Simple .[margin: -10px;  font-weight: bold;line-height: 18px; background: lightblue; color: black; font-size: 12px] Created By: JoeTheHobo ');

function loop(amt,func,finish) {
    for (let i = 0; i < amt; i++) {
        func(i);
    }
    if (finish) finish();
}