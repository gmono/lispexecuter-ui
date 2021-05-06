import{d as e,r as t,p as r,a as l,b as n,o,c as s,e as i,F as h,f as a,t as u,w as c,g as p,h as f,O as y}from"./vendor.2820e916.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(r){const l=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((r,o)=>{const s=new URL(e,l);if(self[t].moduleMap[s])return r(self[t].moduleMap[s]);const i=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),h=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){o(new Error(`Failed to import: ${e}`)),n(h)},onload(){r(self[t].moduleMap[s]),n(h)}});document.head.appendChild(h)})),self[t].moduleMap={}}}("/assets/");class w{constructor(e=null){this.supercir=e,this.selfmap=new Map}Search(e){let t=this.TrySearch(e);if(null==t)throw new Error("符号引用错误！");return t}TrySearch(e){return this.selfmap.has(e)?this.selfmap.get(e):null!=this.supercir?this.supercir.TrySearch(e):void 0}Set(e,t){this.selfmap.set(e,t)}TrySet(e,t){return null==this.TrySearch(e)&&(this.Set(e,t),!0)}SelfHas(e){return!!this.selfmap.has(e)}Delete(e,t){this.selfmap.has(e)?this.selfmap.delete(e):t&&null!=this.supercir&&this.supercir.Delete(e,t)}}class m{constructor(){this.childs=[],this.type="normal"}Empty(){return 0==this.childs.length}get Type(){return this.type}Calculate(e){if(null==this.childs||0==this.childs.length)throw new Error("错误！不可计算空表");let t=this.childs[0];if("object"!=t.type&&(t=t.Calculate(e)),"process"==t.type){let r=new m;return r.childs=this.childs.slice(1,this.childs.length),t.Call(e,r)}throw new Error("错误，只能对过程执行计算!")}}class d extends m{constructor(e){super(),this.Object=null,this.Object=e,this.type="object"}Calculate(e){return this}}class b extends m{constructor(e){super(),this.name=e,this.type="symbol"}Calculate(e){let t=e.Search(this.name);if(null==t)throw new Error("符号引用错误！不存在这样的符号！");return t}}class T extends m{}class g extends T{constructor(e){if(super(),this.self=null,this.type="process",null==e||2!=e.childs.length)throw new Error("过程定义错误！");let t=e.childs[0];if("normal"!=t.Type)throw new Error("过程定义符号表必须为Normal型!");for(let r of t.childs)if(!(r instanceof b))throw new Error("错误！过程声明中必须全为SymbolRefence");this.self=e}get Define(){return this.self.childs[0]}get ParsTable(){let e=this.self.childs[0].childs;e=e.slice(1,e.length);let t=new m;return t.childs=e,t}get Name(){return this.self.childs[0].childs[0].name}get ParsCount(){return this.self.childs[0].childs.length-1}get Body(){return this.self.childs[1]}Calculte(e){return this}Call(e,t){let r=new w(e);if(r.Set("this",this),null==t||t.childs.length<this.ParsCount)throw"错误！调用参数过少！";for(let l=0;l<this.ParsTable.childs.length;++l){let n=t.childs[l].Calculate(e);r.Set(this.ParsTable.childs[l].name,n)}return this.Body.Calculate(r)}}class S extends T{constructor(e,t,r=!1,l=null,n=!0,o=!0){super(),this.Name=e,this.rawFunc=t,this.IsNeedCircum=r,this.CallThis=l,this.IsNeedCal=n,this.IsNeedTrans=o,this.type="process"}Call(e,t){let r=e,l=[];this.IsNeedCircum&&l.push(r);for(let o of t.childs){let t=o;if(this.IsNeedCal&&(t=o.Calculate(e)),"object"==t.Type&&this.IsNeedTrans){let e=t;l.push(e.Object)}else l.push(t)}let n=this.rawFunc.apply(this.CallThis,l);if(n instanceof m)return n;switch(typeof n){case"function":return new S("",n);default:return new d(n)}}Calculate(e){return this}}class C{static SymbolDef(e,t,r,l,n){let o={key:e,isNeedStore:t,Callthis:r,isNeedCal:l,isNeedTrans:n};return function(e,t,r){o.val=e[t],null==e.symbols&&(e.symbols=[]),e.symbols.push(o)}}static RawFunction(e){return function(t,r,l){return C.SymbolDef(e,!1,t,!0,!0)(t,r,l)}}static LispRawFunc(e){return function(t,r,l){return C.SymbolDef(e,!1,t,!0,!1)(t,r,l)}}static OperaSymbol(e){return C.SymbolDef(e,!1,null,!0,!0)}static TableSymbol(e){return function(t,r,l){return C.SymbolDef(e,!0,t,!1,!1)(t,r,l)}}static InnerFunc(e){return function(t,r,l){return C.SymbolDef(e,!0,t,!0,!1)(t,r,l)}}}class E extends w{constructor(e=null){super(),this.LinkObject=e}TrySearch(e){let t=super.TrySearch(e);if(null!=t)return t;if(null!=this.LinkObject){let t,r=e.split("."),l=this.LinkObject;for(let e of r)if(t=l,l=l[e],null==l)return;return"function"!=typeof l?new d(this.LinkObject[e]):new S(e,l,!1,t)}}RawTrySearch(e){return super.TrySearch(e)}}class R{constructor(e,t,r){this.limit=e,this.isreadonly=t,this.num=r}GetBit(e){if(e>=this.limit)return-1;return(this.num&1<<e)>0?1:0}SetBit(e,t){if(e>=this.limit)return-1;let r;if("boolean"==typeof t)r=t;else{if(t>1||t<0)return-1;r=1==t}let l=this.num;r?l|=1<<e:l&=~(1<<e),this.num=l}SetLimitBits(e,t,r){if(this.ReadOnly)throw"错误，只读值";if(e<0||e>this.limit||t>this.limit||t<e)throw"取位长度超限";let l=new F(!0,r);for(let n=e;n<=t;++n){let t=n-e;l.GetBit(t)>0?this.num|=1<<n:this.num&=~(1<<n)}}GetLimitBits(e,t){if(e<0||e>this.limit||t>this.limit||t<e)throw"取位长度超限";let r=0;for(let l=e;l<=t;++l){let t=l-e;this.GetBit(l)>0?r|=1<<t:r&=~(1<<t)}return r}set Value(e){this.isreadonly||(this.num=e,this.num&=4294967295<<32-this.limit)}get Value(){return this.num}get ReadOnly(){return this.isreadonly}}class O extends R{constructor(e,t){super(8,e,t)}}class j extends R{constructor(e,t){super(16,e,t)}ToBytes(){return[new O(!1,this.GetLimitBits(0,7)),new O(!1,this.GetLimitBits(8,15))]}FromBytes(e){this.SetLimitBits(0,7,e[0].Value),this.SetLimitBits(8,15,e[1].Value)}}class F extends R{constructor(e,t){super(32,e,t)}ToWords(){return[new j(!1,this.GetLimitBits(0,15)),new j(!1,this.GetLimitBits(16,31))]}FromWords(e){this.SetLimitBits(0,15,e[0].Value),this.SetLimitBits(16,31,e[1].Value)}ToBytes(){let e=this.ToWords();return e[0].ToBytes().concat(e[1].ToBytes())}FromBytes(e){let t=new j(!0,0);t.FromBytes(e);let r=new j(!0,0);r.FromBytes(e.slice(2,3)),this.FromWords([t,r])}}var L=Object.defineProperty,B=Object.getOwnPropertyDescriptor,I=(e,t,r,l)=>{for(var n,o=l>1?void 0:l?B(t,r):t,s=e.length-1;s>=0;s--)(n=e[s])&&(o=(l?n(t,r,o):n(o))||o);return l&&o&&L(t,r,o),o};class N extends class{AddPreSymbols(){for(let e of this.symbols)this.SetSymbol(e)}constructor(e=null,t){if(this.TopContainer=new E(e),this.AddPreSymbols(),null!=t)for(let r of t)this.SetSymbol(r)}SetSymbol(e){this.TopContainer.Set(e.key,this.ToTable(e))}SetOtherName(e,t){let r=this.TopContainer.RawTrySearch(e);null!=r&&this.TopContainer.Set(t,r)}GetSymbol(e){let t=this.TopContainer.TrySearch(e);if(null!=t)return this.ToRaw(t)}ToRaw(e){if("object"==e.Type){return e.Object}if(e instanceof S){return e.rawFunc}return e}ToString(e){let t=e=>{let r="";if("normal"==e.Type){let l="";for(let r of e.childs)l+=`${t(r)} `;l=l.slice(0,l.length-1),r=`(${l})`}else r="symbol"==e.Type?e.name:"process"==e.Type?`#process:${e.Name}`:JSON.stringify(this.ToRaw(e));return r},r=t(e);return"object"!=e.Type&&"process"!=e.Type&&(r=`'${r}`),r}ToTable(e){if(e.val instanceof m)return e.val;if("function"==typeof e.val){let t=e.val;return new S(e.key,t,e.isNeedStore,e.Callthis,e.isNeedCal,e.isNeedTrans)}return new d(e.val)}Run(e,t=!1){let r=e.Calculate(this.TopContainer);return t?this.ToString(r):this.ToRaw(r)}}{IsTrue(e){return("normal"!=e.Type||0!=e.childs.length)&&("object"!=e.Type||0!=e.Object)}LinkFunc(e){let t=new m;return t.childs=[new b("do")].concat(e),t}TableEqual(e,t){if(e.Type!=t.Type)return!1;if("object"==e.Type)return e.Object==t.Object;if("symbol"==e.Type)return e.name==t.name;if("normal"==e.Type){let r=e.childs,l=t.childs;if(r.length==l.length){for(let e=0;e<r.length;++e)if(!this.TableEqual(r[e],l[e]))return!1;return!0}return!1}}Add(...e){if("number"!=typeof e[0]&&"string"!=typeof e[0])throw new Error("错误！运算对象类型错误！");let t="number"==typeof e[0]?0:"";for(let r of e){if("number"!=typeof r&&"string"!=typeof r)throw new Error("错误！运算对象类型错误！");t+=r}return t}Sub(...e){if("number"!=typeof e[0])throw new Error("错误！运算对象类型错误！");let t=e[0];for(let r of e.slice(1,e.length)){if("number"!=typeof e[0])throw new Error("错误！运算对象类型错误！");t-=r}return t}Mul(...e){let t=e[0];if("string"==typeof t){let r=t;for(let l of e.slice(1,e.length)){if("number"!=typeof l)throw new Error("错误！重复语义乘法除第一个参数外必须都为Number型!");for(let e=0;e<l;++e)t+=r;r=t}}else{if("number"!=typeof t)throw new Error("错误！运算对象类型错误！");for(let r of e.slice(1,e.length))t*=r}return t}Div(...e){if("number"!=typeof e[0])throw new Error("错误！运算对象类型错误！");let t=e[0];for(let r of e.slice(1,e.length)){if("number"!=typeof e[0])throw new Error("错误！运算对象类型错误！");t/=r}return t}CmpA(...e){let t=e[0];for(let r of e.slice(1,e.length)){if(!(t>r))return!1;t=r}return!0}CmpB(...e){let t=e[0];for(let r of e.slice(1,e.length)){if(!(t<r))return!1;t=r}return!0}CmpE(...e){let t=e[0];for(let r of e.slice(1,e.length)){if(t!=r)return!1;t=r}return!0}CmpAE(...e){let t=e[0];for(let r of e.slice(1,e.length)){if(!(t>=r))return!1;t=r}return!0}CmpBE(...e){let t=e[0];for(let r of e.slice(1,e.length)){if(!(t<=r))return!1;t=r}return!0}Do(e,...t){let r;for(let l of t)r=l.Calculate(e);return r.Calculate(e)}Define(e,...t){if(t.length<2)throw new Error("参数数量不正确");let r=t[0];if("symbol"!=r.Type){if("normal"!=r.Type)throw new Error("符号定义错误！头部类型不正确");{let r=t.slice(1,t.length),l=this.LinkFunc(r),n=new m;n.childs[0]=t[0],n.childs[1]=l;let o=new g(n);e.Set(o.Name,o)}}else{if(t.length>2)throw new Error("变量定义形式错误！参数数量不正确");let l=t[1];e.Set(r.name,l.Calculate(e))}}If(e,...t){if(t.length<2)throw new Error("错误！IF操作参数过少！");let r=t[0].Calculate(e),l=!0;if("object"==r.Type){0==r.Object&&(l=!1)}let n=t[1];if(l)return n.Calculate(e);if(t.length>=3){return t[2].Calculate(e)}}STypeof(e,...t){if(1!=t.length)throw"参数数量错误！";return t[0].Calculate(e).Type}GetObjType(e,...t){if(1!=t.length)throw"参数数量错误！";let r=t[0].Calculate(e);if("object"==r.Type)return new d(typeof r.Object);throw new Error("错误！只能对数据对象使用objtype操作符")}Quote(e,...t){if(1!=t.length)throw"参数数量错误！";return t[0]}CAR(e,...t){if(1!=t.length)throw"参数数量错误！";return t[0].childs[0]}CDR(e,...t){if(1!=t.length)throw"参数数量错误！";let r=t[0],l=new m;return l.childs=r.childs.slice(1,r.childs.length),l}Cons(e,...t){if(2!=t.length)throw"参数数量错误！";let r=t[0],l=t[1];if("normal"!=l.Type)throw new Error("错误！参数2必须为表");let n=new m;return n.childs=[r].concat(l.childs),n}Cond(e,...t){let r=0;for(let l of t){let n=l;if("normal"!=n.Type||n.childs.length<2)throw new Error("Cond参数错误！必须为normal表并且包含两个以上的子表！");let o=n.childs[0];if("symbol"==o.Type&&"else"==o.name){if(r!=t.length-1)throw new Error("错误！else必须放在cond语句的最后位置");o=new d(!0)}let s=o.Calculate(e),i=this.LinkFunc(n.childs.slice(1,n.childs.length));if(this.IsTrue(s)){return i.Calculate(e)}r++}}Lambda(e,...t){if(t.length<2)throw new Error("参数数量不正确");let r=t[0];if("normal"!=r.Type&&"symbol"!=r.Type)throw new Error("符号定义错误！头部类型不正确");let l=t.slice(1,t.length),n=new m;n.childs.push(new b("do")),n.childs=n.childs.concat(l);let o=new m,s=new m;return s.childs.push(new b("")),"normal"==r.Type&&(s.childs=s.childs.concat(r.childs)),o.childs[0]=s,o.childs[1]=n,new g(o)}isEqual(e,...t){if(2!=t.length)throw"参数数量错误！";return new d(this.TableEqual(t[0],t[1]))}isEq(e,...t){if(2!=t.length)throw"参数数量错误！";let r=t;return r[0].Type!=r[1].Type?new d(!1):"symbol"==r[0].Type?new d(r[0].name==r[1].name):"object"==r[0].Type&&new d(t[0].Object==t[1].Object)}Atom(e,...t){if(1!=t.length)throw"参数数量错误！";return"object"==t[0].Type?new d(!0):new d(!1)}GetProp(e,...t){if(2!=t.length)throw"参数数量错误！";let r=t[0].Calculate(e);if("object"==r.Type){let l,n=r.Object,o=t[1];if(o=o.Calculate(e),"object"!=o.Type)throw new Error("错误！属性名必须为字符串或符号引用");if(l=o.Object,l in n)return new d(n[l]);throw new Error(`错误！指定对象中不存在属性：${l}`)}}AsProc(e,...t){if(1!=t.length)throw"参数数量错误！";let r=t[0];if("object"==r.Type&&"function"==typeof r.Object)return new S("",r.Object,!1)}GetSymName(e,...t){if(1!=t.length)throw"参数数量错误！";let r=t[0];if("symbol"==r.Type)return new d(r.name);throw new Error("只能对符号执行字符串化!")}AND(...e){if(2!=e.length)throw"参数数量错误！";return new d(e[0]&&e[1])}OR(...e){if(2!=e.length)throw"参数数量错误！";return new d(e[0]||e[1])}NOT(...e){if(1!=e.length)throw"参数数量错误！";return new d(!e[0])}BITNOT(...e){if(1!=e.length)throw"参数数量错误！";let t=e[0];if("number"!=typeof t)throw new Error("错误！只能对数值类型进行位运算");return~t}BITAND(...e){if(2!=e.length)throw"参数数量错误！";let t=e[0],r=e[1];if("number"!=typeof t||"number"!=typeof r)throw new Error("错误！只能对数值类型进行位运算");return t&r}BITOR(...e){if(2!=e.length)throw"参数数量错误！";let t=e[0],r=e[1];if("number"!=typeof t||"number"!=typeof r)throw new Error("错误！只能对数值类型进行位运算");return t|r}SHL(...e){if(2!=e.length)throw"参数数量错误！";let t=e[0],r=e[1];if("number"!=typeof t||"number"!=typeof r)throw new Error("错误！只能对数值类型进行位运算");return t<<r}SHR(...e){if(2!=e.length)throw"参数数量错误！";let t=e[0],r=e[1];if("number"!=typeof t||"number"!=typeof r)throw new Error("错误！只能对数值类型进行位运算");return t>>r}ROL(...e){if(2!=e.length)throw"参数数量错误！";let t=e[0],r=e[1];if("number"!=typeof t||"number"!=typeof r)throw new Error("错误！只能对数值类型进行位运算");if(0==r)return t;let l=new F(!0,t).GetLimitBits(32-r,31),n=t<<r,o=new F(!1,n);return o.SetLimitBits(0,r-1,l),n=o.Value,n}ROR(...e){if(2!=e.length)throw"参数数量错误！";let t=e[0],r=e[1];if("number"!=typeof t||"number"!=typeof r)throw new Error("错误！只能对数值类型进行位运算");if(0==r)return t;let l=new F(!0,t).GetLimitBits(0,r-1),n=t>>r,o=new F(!1,n);return o.SetLimitBits(r,31,l),n=o.Value,n}Let(e,...t){let r=t[0],l=t.slice(1,t.length),n=new w(e);for(let o of r.childs){if(2!=o.childs.length||"symbol"!=o.childs[0].Type)throw new Error("错误！定义序列元素中第一项应为符号");let e=o.childs[0];if(n.SelfHas(e.name))throw new Error("错误！局部变量重复定义");let t=o.childs[1].Calculate(n);n.Set(e.name,t)}return this.Do.apply(this,[n].concat(l))}UseValue(e,...t){if(2!=t.length)throw new Error("错误！元组赋值只允许两个参数");let r=t[0],l=t[1];if(r.childs.length!=l.childs.length)throw new Error("错误！元组赋值数量不对等");for(let n=0;n<r.childs.length;++n){let t=r.childs[n];if("symbol"!=t.Type)throw new Error("错误！元组赋值中第一个表必须为纯符号表");let o=l.childs[n].Calculate(e);e.Set(t.name,o)}}SetValue(e,...t){if(2!=t.length)throw new Error("错误！元组赋值只允许两个参数");let r=t[0],l=t[1];if(r.childs.length!=l.childs.length)throw new Error("错误！元组赋值数量不对等");for(let n of r.childs)if("symbol"!=n.Type||null==e.TrySearch(n.name))throw new Error("错误！要赋值的符号不存在");this.UseValue.apply(this,[e].concat(t))}Cal(e,...t){if(t.length<1)throw new Error("错误！参数过少");let r;for(let l of t)r=l.Calculate(e);return r}AsSymbol(e,...t){if(1!=t.length)throw new Error("参数数量错误!");let r=t[0];if("object"!=r.Type)throw new Error("错误！只能对数据对象(可字符串化)执行assym操作");return new b(r.Object)}AddPreSymbols(){super.AddPreSymbols(),this.SetOtherName("define","set!"),this.SetOtherName("do","begin"),this.SetOtherName("eqv?","eq?")}}I([C.RawFunction("+")],N.prototype,"Add",1),I([C.RawFunction("-")],N.prototype,"Sub",1),I([C.RawFunction("*")],N.prototype,"Mul",1),I([C.RawFunction("/")],N.prototype,"Div",1),I([C.RawFunction(">")],N.prototype,"CmpA",1),I([C.RawFunction("<")],N.prototype,"CmpB",1),I([C.RawFunction("=")],N.prototype,"CmpE",1),I([C.RawFunction(">=")],N.prototype,"CmpAE",1),I([C.RawFunction("<=")],N.prototype,"CmpBE",1),I([C.TableSymbol("do")],N.prototype,"Do",1),I([C.TableSymbol("define")],N.prototype,"Define",1),I([C.TableSymbol("if")],N.prototype,"If",1),I([C.TableSymbol("typeof")],N.prototype,"STypeof",1),I([C.TableSymbol("objtype")],N.prototype,"GetObjType",1),I([C.TableSymbol("quote")],N.prototype,"Quote",1),I([C.InnerFunc("car")],N.prototype,"CAR",1),I([C.InnerFunc("cdr")],N.prototype,"CDR",1),I([C.InnerFunc("cons")],N.prototype,"Cons",1),I([C.TableSymbol("cond")],N.prototype,"Cond",1),I([C.TableSymbol("lambda")],N.prototype,"Lambda",1),I([C.InnerFunc("equal?")],N.prototype,"isEqual",1),I([C.InnerFunc("eq?")],N.prototype,"isEq",1),I([C.InnerFunc("atom")],N.prototype,"Atom",1),I([C.TableSymbol("prop")],N.prototype,"GetProp",1),I([C.TableSymbol("proc")],N.prototype,"AsProc",1),I([C.TableSymbol("symname")],N.prototype,"GetSymName",1),I([C.RawFunction("and")],N.prototype,"AND",1),I([C.RawFunction("or")],N.prototype,"OR",1),I([C.RawFunction("not")],N.prototype,"NOT",1),I([C.RawFunction("~")],N.prototype,"BITNOT",1),I([C.RawFunction("&")],N.prototype,"BITAND",1),I([C.RawFunction("|")],N.prototype,"BITOR",1),I([C.RawFunction("<<")],N.prototype,"SHL",1),I([C.RawFunction(">>")],N.prototype,"SHR",1),I([C.RawFunction("rol")],N.prototype,"ROL",1),I([C.RawFunction("ror")],N.prototype,"ROR",1),I([C.TableSymbol("let")],N.prototype,"Let",1),I([C.TableSymbol("use")],N.prototype,"UseValue",1),I([C.TableSymbol("set")],N.prototype,"SetValue",1),I([C.InnerFunc("cal")],N.prototype,"Cal",1),I([C.InnerFunc("assym")],N.prototype,"AsSymbol",1);var P=e({name:"Home",props:{},setup:()=>{let e=new N(window),r=t({resultList:[],nowInput:""});return{data:r,keypress:()=>{r.resultList.push({message:r.nowInput,type:"command"});try{let t=e.Run(class extends class{static Parse(e){if(0==(e=e.trim()).length)return null;let t=this.ParseCode(e,0);return null==t?null:t.obj}static ReadValue(e){let t=(e=e.trim())[0];if("{"==t||"["==t||'"'==t||"true"==e||"false"==e)return new d(JSON.parse(e));{let t=null,r="box";for(let l of r)if(-1!=e.indexOf(l)&&e.lastIndexOf(l)==e.indexOf(l)){t=parseInt(e);break}if(null==t)if("#"==e[0]){let r="0x"+e.slice(1,e.length);t=parseInt(r)}else t=parseFloat(e);return isNaN(t)?new b(e):new d(t)}}static ParseCode(e,t){e=`${e=e.trim()} `;let r=new m,l="",n=!1,o=!1,s=0,i=!0;for(;t<e.length;++t){let h=e[t];if(0==s){if(" "==h||"\t"==h){if(n){let e=this.ReadValue(l);r.childs.push(e),l="",n=!1}if(o)continue;break}if("("!=h){if(")"==h){if(!o){if(n){let e=this.ReadValue(l);r.childs.push(e),l="",n=!1}break}if(n){let e=this.ReadValue(l);r.childs.push(e)}t++,i=!0;break}if("'"==h){let l=this.ParseCode(e,t+1),n=new m;if(n.childs.push(new b("quote")),n.childs.push(l.obj),t=l.nowptr-1,r.childs.push(n),o)continue;break}n||(n=!0,"{"!=h&&"["!=h&&'"'!=h||s++),l+=h}else{if(i){i=!1,o=!0;continue}let l=this.ParseCode(e,t);t=l.nowptr,t--,r.childs.push(l.obj)}}else"}"!=h&&"]"!=h&&'"'!=h||s--,l+=h}if(!i)throw new Error("解析错误！解析过程未正常结束！");return o?{nowptr:t,obj:r}:{nowptr:t,obj:r.childs[0]}}}{constructor(){super()}static Parse(e){let t=e.split("->"),r=null,l=!1;for(let n of t){let e=null,t=!1;if("*"==n.trim()[0]){if(e=super.Parse(n.slice(1,n.length)),"normal"!=e.Type)throw new Error("解析错误！只能对normal型表执行解耦合操作");t=!0}else e=super.Parse(n),t=!1;null!=r&&(l?e.childs=e.childs.concat(r.childs):e.childs.push(r)),r=e,l=t}return r}}.Parse(r.nowInput.trim()));r.resultList.push({message:t,type:"result"})}catch(t){r.resultList.push({message:t.message,type:"error"})}finally{r.nowInput=""}}}}});const v=p();r("data-v-296d049c");const D={class:"replResult"},A={class:"replID"},V={style:{display:"inline-block"}},k={style:{"font-weight":"border","font-size":"small"}};l();const x=v(((e,t,r,l,p,f)=>{const y=n("el-input");return o(),s(h,null,[i("ul",D,[(o(!0),s(h,null,a(e.data.resultList,((e,t)=>(o(),s("li",{class:["replItem",e.type],key:t},[i("span",A,"["+u(t)+"]:",1),i("span",V,[i("div",k,u(e.type),1),i("div",null,u(e.message),1)])],2)))),128))]),i(y,{modelValue:e.data.nowInput,"onUpdate:modelValue":t[1]||(t[1]=t=>e.data.nowInput=t),placeholder:"输入命令后回车",onKeypress:c(e.keypress,["enter"])},null,8,["modelValue","onKeypress"])],64)}));P.render=x,P.__scopeId="data-v-296d049c";var G=e({name:"App",components:{Home:P}});const q=i("img",{style:{height:"10vh"},alt:"Vue logo",src:"/assets/logo.687285a2.png"},null,-1);G.render=function(e,t,r,l,a,u){const c=n("Home");return o(),s(h,null,[q,i(c,{msg:"Hello Vue 3 + TypeScript + Vite"})],64)};f(G).use(y).mount("#app");
