(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fbdec68"],{"04bb":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{staticClass:"mx-auto",attrs:{disabled:e.isLoading,loading:e.isLoading,"max-width":"700",outlined:"",rounded:"lg"}},[a("v-card-title",[e._v("ערוך ספר - "+e._s(e.book.title))]),a("v-card-text",[a("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-text-field",{attrs:{filled:"",label:"כותרת",required:"",clearable:""},model:{value:e.book.title,callback:function(t){e.$set(e.book,"title",t)},expression:"book.title"}}),a("v-textarea",{attrs:{filled:"",label:"תיאור",clearable:""},model:{value:e.book.description,callback:function(t){e.$set(e.book,"description",t)},expression:"book.description"}}),a("v-text-field",{attrs:{filled:"",label:"תמונה",required:"",clearable:""},model:{value:e.book.image,callback:function(t){e.$set(e.book,"image",t)},expression:"book.image"}}),a("v-img",{directives:[{name:"show",rawName:"v-show",value:e.previewImageLoaded,expression:"previewImageLoaded"}],staticClass:"mx-auto mb-5",attrs:{src:e.book.image,"max-width":"70%"},on:{load:e.onImgLoad}}),e.error?a("v-alert",{attrs:{dense:"",text:"",type:"error"}},[e._v(" "+e._s(e.error)+" ")]):e._e(),a("div",{staticClass:"text-center"},[a("v-btn",{attrs:{color:"success","min-width":"170px","min-height":"50px",large:"",depressed:"",loading:e.isLoading,disabled:!e.valid},on:{click:e.submitForm}},[a("span",{staticClass:"font-weight-bold",staticStyle:{"font-size":"16px"}},[e._v("שמור")])])],1)],1)],1)],1)},r=[],i=a("5530"),n=a("1da1"),s=(a("96cf"),a("ac1f"),a("5319"),a("a4d3"),a("e01a"),{data:function(){return{isLoading:!1,error:null,valid:!0,book:{title:null,description:null,image:null},previewImageLoaded:!1,changesSaved:!1}},computed:{bookId:function(){return this.$route.params.bookId}},watch:{image:function(e){this.previewImageLoaded=!1,(null===e||void 0===e?void 0:e.length)>10?this.error="תמונה לא תקינה":this.error=""}},beforeRouteLeave:function(e,t,a){if(this.changesSaved)a();else{var o=confirm("בטוח שברצונך לעזוב? שינויים לא נשמרו");a(o)}},created:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=localStorage.getItem("userId"),t.next=3,e.$store.dispatch("books/fetchBook",{bookId:e.bookId});case 3:if(o=e.$store.getters["books/currentBook"],a===o.userId._id){t.next=8;break}return e.changesSaved=!0,e.$router.replace({name:"Book",params:{bookId:e.bookId}}),t.abrupt("return");case 8:o&&(e.book.title=o.title,e.book.description=o.description,e.book.image=o.image);case 9:case"end":return t.stop()}}),t)})))()},methods:{onImgLoad:function(){this.previewImageLoaded=!0,this.error=""},submitForm:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$refs.form.validate()){t.next=2;break}return t.abrupt("return");case 2:return e.isLoading=!0,t.prev=3,t.next=6,e.$store.dispatch("books/updateBook",Object(i["a"])(Object(i["a"])({},e.book),{},{bookId:e.bookId}));case 6:e.$router.replace({name:"Book",params:{bookId:e.bookId}}),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](3),e.error=t.t0.message;case 12:e.isLoading=!1;case 13:case"end":return t.stop()}}),t,null,[[3,9]])})))()}}}),l=s,c=a("2877"),u=a("6544"),d=a.n(u),h=a("0798"),p=a("8336"),b=a("b0af"),m=a("99d9"),f=a("4bd4"),v=a("adda"),g=a("8654"),k=a("a844"),w=Object(c["a"])(l,o,r,!1,null,null,null);t["default"]=w.exports;d()(w,{VAlert:h["a"],VBtn:p["a"],VCard:b["a"],VCardText:m["c"],VCardTitle:m["d"],VForm:f["a"],VImg:v["a"],VTextField:g["a"],VTextarea:k["a"]})},1681:function(e,t,a){},a844:function(e,t,a){"use strict";var o=a("5530"),r=(a("a9e3"),a("1681"),a("8654")),i=a("58df"),n=Object(i["a"])(r["a"]);t["a"]=n.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(e){return!isNaN(parseFloat(e))}},rows:{type:[Number,String],default:5,validator:function(e){return!isNaN(parseInt(e,10))}}},computed:{classes:function(){return Object(o["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},r["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{autoGrow:function(e){var t=this;this.$nextTick((function(){var a;e?t.calculateInputHeight():null==(a=t.$refs.input)||a.style.removeProperty("height")}))},lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var e=this;setTimeout((function(){e.autoGrow&&e.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var e=this.$refs.input;if(e){e.style.height="0";var t=e.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);e.style.height=Math.max(a,t)+"px"}},genInput:function(){var e=r["a"].options.methods.genInput.call(this);return e.tag="textarea",delete e.data.attrs.type,e.data.attrs.rows=this.rows,e},onInput:function(e){r["a"].options.methods.onInput.call(this,e),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(e){this.isFocused&&13===e.keyCode&&e.stopPropagation(),this.$emit("keydown",e)}}})}}]);
//# sourceMappingURL=chunk-0fbdec68.75dc28fd.js.map