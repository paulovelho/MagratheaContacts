import{D as B,E as O,G as mt,H as ft,Ia as Ct,Ja as xt,Ka as Tt,M as dt,Na as V,R as _t,S as ht,T as w,U as z,W as bt,d as ct,e as at,f as pt,j as st,va as vt,w as lt,y as ut,za as yt}from"./chunk-UODN2MHY.js";import{$a as J,Db as k,Eb as L,Fb as S,Gb as I,Ic as it,Kb as x,La as Y,Lb as r,Ma as l,Mc as ot,Nc as rt,Ob as g,Qb as v,Ra as U,Rb as y,S as Q,Sa as m,Sb as R,Sc as gt,T as Z,Tc as F,Vc as D,Wb as u,Wc as M,X as q,Xb as X,Xc as A,Yb as tt,_a as W,aa as h,ba as b,cb as G,ea as N,eb as s,gb as E,jc as et,lc as j,mc as nt,na as $,pa as K,qb as P,wb as a,xb as f,xc as _,yb as d,zb as T}from"./chunk-YBFLAJGR.js";var It=`
    .p-confirmpopup {
        position: absolute;
        margin-top: dt('confirmpopup.gutter');
        top: 0;
        left: 0;
        background: dt('confirmpopup.background');
        color: dt('confirmpopup.color');
        border: 1px solid dt('confirmpopup.border.color');
        border-radius: dt('confirmpopup.border.radius');
        box-shadow: dt('confirmpopup.shadow');
    }

    .p-confirmpopup-content {
        display: flex;
        align-items: center;
        padding: dt('confirmpopup.content.padding');
        gap: dt('confirmpopup.content.gap');
    }

    .p-confirmpopup-icon {
        font-size: dt('confirmpopup.icon.size');
        width: dt('confirmpopup.icon.size');
        height: dt('confirmpopup.icon.size');
        color: dt('confirmpopup.icon.color');
    }

    .p-confirmpopup-footer {
        display: flex;
        justify-content: flex-end;
        gap: dt('confirmpopup.footer.gap');
        padding: dt('confirmpopup.footer.padding');
    }

    .p-confirmpopup-footer button {
        width: auto;
    }

    .p-confirmpopup-footer button:last-child {
        margin: 0;
    }

    .p-confirmpopup-flipped {
        margin-block-start: calc(dt('confirmpopup.gutter') * -1);
        margin-block-end: dt('confirmpopup.gutter');
    }

    .p-confirmpopup-enter-from {
        opacity: 0;
        transform: scaleY(0.8);
    }

    .p-confirmpopup-leave-to {
        opacity: 0;
    }

    .p-confirmpopup-enter-active {
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-confirmpopup-leave-active {
        transition: opacity 0.1s linear;
    }

    .p-confirmpopup:after,
    .p-confirmpopup:before {
        bottom: 100%;
        left: calc(dt('confirmpopup.arrow.offset') + dt('confirmpopup.arrow.left'));
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .p-confirmpopup:after {
        border-width: calc(dt('confirmpopup.gutter') - 2px);
        margin-left: calc(-1 * (dt('confirmpopup.gutter') - 2px));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('confirmpopup.background');
    }

    .p-confirmpopup:before {
        border-width: dt('confirmpopup.gutter');
        margin-left: calc(-1 * dt('confirmpopup.gutter'));
        border-style: solid;
        border-color: transparent;
        border-bottom-color: dt('confirmpopup.border.color');
    }

    .p-confirmpopup-flipped:after,
    .p-confirmpopup-flipped:before {
        bottom: auto;
        top: 100%;
    }

    .p-confirmpopup-flipped:after {
        border-bottom-color: transparent;
        border-top-color: dt('confirmpopup.background');
    }

    .p-confirmpopup-flipped:before {
        border-bottom-color: transparent;
        border-top-color: dt('confirmpopup.border.color');
    }
`;var Pt=["content"],kt=["accepticon"],Lt=["rejecticon"],St=["headless"],Rt=(e,o)=>({showTransitionParams:e,hideTransitionParams:o}),Bt=e=>({value:"open",params:e}),wt=e=>({$implicit:e});function Ot(e,o){e&1&&S(0)}function zt(e,o){if(e&1&&(k(0),s(1,Ot,1,0,"ng-container",9),L()),e&2){let t=r(2);l(),a("ngTemplateOutlet",t.headlessTemplate||t._headlessTemplate)("ngTemplateOutletContext",j(2,wt,t.confirmation))}}function Ft(e,o){e&1&&S(0)}function Dt(e,o){if(e&1&&(k(0),s(1,Ft,1,0,"ng-container",9),L()),e&2){let t=r(3);l(),a("ngTemplateOutlet",t.contentTemplate||t._contentTemplate)("ngTemplateOutletContext",j(2,wt,t.confirmation))}}function Mt(e,o){if(e&1&&T(0,"i"),e&2){let t=r(4);u(t.cx("icon"))}}function At(e,o){if(e&1&&(s(0,Mt,1,2,"i",12),f(1,"span"),X(2),d()),e&2){let t=r(3);a("ngIf",t.confirmation==null?null:t.confirmation.icon),l(),u(t.cx("message")),l(),tt(t.confirmation==null?null:t.confirmation.message)}}function Vt(e,o){if(e&1&&T(0,"i"),e&2){let t=r(5);u(t.confirmation==null?null:t.confirmation.rejectIcon)}}function Ht(e,o){}function Qt(e,o){e&1&&s(0,Ht,0,0,"ng-template",null,4,_)}function Zt(e,o){if(e&1&&s(0,Vt,1,2,"i",14)(1,Qt,2,0,null,15),e&2){let t=r(4);a("ngIf",t.confirmation==null?null:t.confirmation.rejectIcon)("ngIfElse",t.rejecticon),l(),a("ngTemplateOutlet",t.rejectIconTemplate||t._rejectIconTemplate)}}function qt(e,o){if(e&1){let t=I();f(0,"p-button",13),x("onClick",function(){h(t);let i=r(3);return b(i.onReject())}),s(1,Zt,2,3,"ng-template",null,3,_),d()}if(e&2){let t=r(3);u(t.cx("pcRejectButton")),a("label",t.rejectButtonLabel)("styleClass",t.confirmation==null?null:t.confirmation.rejectButtonStyleClass)("size",(t.confirmation.rejectButtonProps==null?null:t.confirmation.rejectButtonProps.size)||"small")("text",(t.confirmation.rejectButtonProps==null?null:t.confirmation.rejectButtonProps.text)||!1)("buttonProps",t.getRejectButtonProps())("autofocus",t.autoFocusReject),P("aria-label",t.rejectButtonLabel)}}function Nt(e,o){if(e&1&&T(0,"i"),e&2){let t=r(5);u(t.confirmation==null?null:t.confirmation.acceptIcon)}}function $t(e,o){}function Kt(e,o){e&1&&s(0,$t,0,0,"ng-template",null,5,_)}function Yt(e,o){if(e&1&&s(0,Nt,1,2,"i",14)(1,Kt,2,0,null,15),e&2){let t=r(4);a("ngIf",t.confirmation==null?null:t.confirmation.acceptIcon)("ngIfElse",t.accepticontemplate),l(),a("ngTemplateOutlet",t.acceptIconTemplate||t._acceptIconTemplate)}}function Ut(e,o){if(e&1){let t=I();f(0,"p-button",16),x("onClick",function(){h(t);let i=r(3);return b(i.onAccept())}),s(1,Yt,2,3,"ng-template",null,3,_),d()}if(e&2){let t=r(3);u(t.cx("pcAcceptButton")),a("label",t.acceptButtonLabel)("styleClass",t.confirmation==null?null:t.confirmation.acceptButtonStyleClass)("size",(t.confirmation.acceptButtonProps==null?null:t.confirmation.acceptButtonProps.size)||"small")("buttonProps",t.getAcceptButtonProps())("autofocus",t.autoFocusAccept),P("aria-label",t.acceptButtonLabel)}}function Wt(e,o){if(e&1&&(f(0,"div",null,1),s(2,Dt,2,4,"ng-container",8)(3,At,3,4,"ng-template",null,2,_),d(),f(5,"div"),s(6,qt,3,9,"p-button",10)(7,Ut,3,8,"p-button",11),d()),e&2){let t=R(4),n=r(2);u(n.cx("content")),l(2),a("ngIf",n.contentTemplate||n._contentTemplate)("ngIfElse",t),l(3),u(n.cx("footer")),l(),a("ngIf",(n.confirmation==null?null:n.confirmation.rejectVisible)!==!1),l(),a("ngIf",(n.confirmation==null?null:n.confirmation.acceptVisible)!==!1)}}function Jt(e,o){if(e&1){let t=I();f(0,"div",7),x("click",function(i){h(t);let c=r();return b(c.onOverlayClick(i))})("@animation.start",function(i){h(t);let c=r();return b(c.onAnimationStart(i))})("@animation.done",function(i){h(t);let c=r();return b(c.onAnimationEnd(i))}),s(1,zt,2,4,"ng-container",8)(2,Wt,8,8,"ng-template",null,0,_),d()}if(e&2){let t=R(3),n=r();u(n.cn(n.cx("root"),n.styleClass)),a("ngStyle",n.style)("@animation",j(9,Bt,nt(6,Rt,n.showTransitionOptions,n.hideTransitionOptions))),l(),a("ngIf",n.headlessTemplate||n._headlessTemplate)("ngIfElse",t)}}var Gt={root:()=>["p-confirmpopup p-component"],content:"p-confirmpopup-content",icon:({instance:e})=>["p-confirmpopup-icon",e.confirmation?.icon],message:"p-confirmpopup-message",footer:"p-confirmpopup-footer",pcRejectButton:"p-confirmpopup-reject-button",pcAcceptButton:"p-confirmpopup-accept-button"},jt=(()=>{class e extends bt{name="confirmpopup";theme=It;classes=Gt;static \u0275fac=(()=>{let t;return function(i){return(t||(t=$(e)))(i||e)}})();static \u0275prov=Q({token:e,factory:e.\u0275fac})}return e})();var Xt=(()=>{class e extends vt{el;confirmationService;renderer;cd;overlayService;document;key;defaultFocus="accept";showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";autoZIndex=!0;baseZIndex=0;style;styleClass;get visible(){return this._visible}set visible(t){this._visible=t,this.cd.markForCheck()}container;subscription;confirmation;autoFocusAccept=!1;autoFocusReject=!1;contentTemplate;acceptIconTemplate;rejectIconTemplate;headlessTemplate;_contentTemplate;_acceptIconTemplate;_rejectIconTemplate;_headlessTemplate;_visible;documentClickListener;documentResizeListener;scrollHandler;window;_componentStyle=q(jt);constructor(t,n,i,c,p,Et){super(),this.el=t,this.confirmationService=n,this.renderer=i,this.cd=c,this.overlayService=p,this.document=Et,this.window=this.document.defaultView,this.subscription=this.confirmationService.requireConfirmation$.subscribe(C=>{if(!C){this.hide();return}C.key===this.key&&(this.confirmation=C,Object.keys(C).forEach(H=>{this[H]=C[H]}),this.confirmation.accept&&(this.confirmation.acceptEvent=new E,this.confirmation.acceptEvent.subscribe(this.confirmation.accept)),this.confirmation.reject&&(this.confirmation.rejectEvent=new E,this.confirmation.rejectEvent.subscribe(this.confirmation.reject)),this.visible=!0)})}templates;ngAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"content":this._contentTemplate=t.template;break;case"rejecticon":this._rejectIconTemplate=t.template;break;case"accepticon":this._acceptIconTemplate=t.template;break;case"headless":this._headlessTemplate=t.template;break}})}option(t,n){let i=this;if(i.hasOwnProperty(t))return n?i[n]:i[t]}onEscapeKeydown(t){this.confirmation&&this.confirmation.closeOnEscape&&this.onReject()}onAnimationStart(t){t.toState==="open"&&(this.container=t.element,this.renderer.appendChild(this.document.body,this.container),this.align(),this.bindListeners(),this.autoFocusAccept=this.defaultFocus===void 0||this.defaultFocus==="accept",this.autoFocusReject=this.defaultFocus==="reject")}onAnimationEnd(t){switch(t.toState){case"void":this.onContainerDestroy();break}}getAcceptButtonProps(){return this.option("acceptButtonProps")}getRejectButtonProps(){return this.option("rejectButtonProps")}align(){if(this.autoZIndex&&V.set("overlay",this.container,this.config.zIndex.overlay),!this.confirmation)return;ut(this.container,this.confirmation?.target,!1);let t=O(this.container),n=O(this.confirmation?.target),i=0;t.left<n.left&&(i=n.left-t.left),this.container.style.setProperty("--p-confirmpopup-arrow-left",`${i}px`),t.top<n.top&&lt(this.container,"p-confirm-popup-flipped")}hide(){this.visible=!1}onAccept(){this.confirmation?.acceptEvent&&this.confirmation.acceptEvent.emit(),this.hide(),B(this.confirmation?.target)}onReject(){this.confirmation?.rejectEvent&&this.confirmation.rejectEvent.emit(),this.hide(),B(this.confirmation?.target)}onOverlayClick(t){this.overlayService.add({originalEvent:t,target:this.el.nativeElement})}bindListeners(){setTimeout(()=>{this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindScrollListener()})}unbindListeners(){this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindScrollListener()}bindDocumentClickListener(){if(!this.documentClickListener){let t=mt()?"touchstart":"click",n=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentClickListener=this.renderer.listen(n,t,i=>{if(this.confirmation&&this.confirmation.dismissableMask!==!1){let c=this.confirmation.target;this.container!==i.target&&!this.container?.contains(i.target)&&c!==i.target&&!c.contains(i.target)&&this.hide()}})}}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}onWindowResize(){this.visible&&!ft()&&this.hide()}bindDocumentResizeListener(){this.documentResizeListener||(this.documentResizeListener=this.renderer.listen(this.window,"resize",this.onWindowResize.bind(this)))}unbindDocumentResizeListener(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new yt(this.confirmation?.target,()=>{this.visible&&this.hide()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}unsubscribeConfirmationSubscriptions(){this.confirmation&&(this.confirmation.acceptEvent&&this.confirmation.acceptEvent.unsubscribe(),this.confirmation.rejectEvent&&this.confirmation.rejectEvent.unsubscribe())}onContainerDestroy(){this.unbindListeners(),this.unsubscribeConfirmationSubscriptions(),this.autoZIndex&&V.clear(this.container),this.confirmation=null,this.container=null}restoreAppend(){this.container&&this.renderer.removeChild(this.document.body,this.container),this.onContainerDestroy()}get acceptButtonLabel(){return this.confirmation?.acceptLabel||this.config.getTranslation(z.ACCEPT)}get rejectButtonLabel(){return this.confirmation?.rejectLabel||this.config.getTranslation(z.REJECT)}ngOnDestroy(){this.restoreAppend(),this.subscription&&this.subscription.unsubscribe()}static \u0275fac=function(n){return new(n||e)(m(K),m(dt),m(U),m(it),m(_t),m(N))};static \u0275cmp=W({type:e,selectors:[["p-confirmpopup"]],contentQueries:function(n,i,c){if(n&1&&(g(c,Pt,4),g(c,kt,4),g(c,Lt,4),g(c,St,4),g(c,ht,4)),n&2){let p;v(p=y())&&(i.contentTemplate=p.first),v(p=y())&&(i.acceptIconTemplate=p.first),v(p=y())&&(i.rejectIconTemplate=p.first),v(p=y())&&(i.headlessTemplate=p.first),v(p=y())&&(i.templates=p)}},hostBindings:function(n,i){n&1&&x("keydown.escape",function(p){return i.onEscapeKeydown(p)},Y)},inputs:{key:"key",defaultFocus:"defaultFocus",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",autoZIndex:[2,"autoZIndex","autoZIndex",ot],baseZIndex:[2,"baseZIndex","baseZIndex",rt],style:"style",styleClass:"styleClass",visible:"visible"},features:[et([jt]),G],decls:1,vars:1,consts:[["notHeadless",""],["content",""],["withoutContentTemplate",""],["icon",""],["rejecticon",""],["accepticontemplate",""],["pFocusTrap","","role","alertdialog",3,"class","ngStyle","click",4,"ngIf"],["pFocusTrap","","role","alertdialog",3,"click","ngStyle"],[4,"ngIf","ngIfElse"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["type","button",3,"label","class","styleClass","size","text","buttonProps","autofocus","onClick",4,"ngIf"],["type","button",3,"label","class","styleClass","size","buttonProps","autofocus","onClick",4,"ngIf"],[3,"class",4,"ngIf"],["type","button",3,"onClick","label","styleClass","size","text","buttonProps","autofocus"],[3,"class",4,"ngIf","ngIfElse"],[4,"ngTemplateOutlet"],["type","button",3,"onClick","label","styleClass","size","buttonProps","autofocus"]],template:function(n,i){n&1&&s(0,Jt,4,11,"div",6),n&2&&a("ngIf",i.visible)},dependencies:[st,ct,pt,at,w,xt,Ct,Tt],encapsulation:2,data:{animation:[gt("animation",[M("void",D({transform:"scaleY(0.8)",opacity:0})),M("open",D({transform:"translateY(0)",opacity:1})),A("void => open",F("{{showTransitionParams}}")),A("open => void",F("{{hideTransitionParams}}"))])]},changeDetection:0})}return e})(),Pe=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=J({type:e});static \u0275inj=Z({imports:[Xt,w,w]})}return e})();export{Xt as a,Pe as b};
