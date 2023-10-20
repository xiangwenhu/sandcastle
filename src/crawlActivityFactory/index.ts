import factory, { register } from "../activityFactory";

import browserActivityFactory from "./browser";
import pageActivityFactory from "./page";

import clickActivityFactory from "./click";
import closeActivityFactory from "./close";
import contentActivityFactory from "./content";
import evaluateActivityFactory from "./evaluate";
import evaluateClickActivityFactory from "./evaluateClick";
import fetchActivityFactory from "./fetch";
import getCookieActivityFactory from "./getCookie";
import goBackActivityFactory from "./goBack";
import goForwardActivityFactory from "./goForward";
import gotoActivityFactory from "./goto";
import isClosedActivityFactory from "./isClosed";
import reloadActivityFactory from "./reload";
import setCookieActivityFactory from "./setCookie";
import setUserAgentActivityFactory from "./setUserAgent";
import titleActivityFactory from "./title";
import typeActivityFactory from "./type";
import urlActivityFactory from "./url";
import waitForNavActivityFactory from "./waitForNav";
import waitForRequestActivityFactory from "./waitForRequest";
import waitForResponseActivityFactory from "./waitForResponse";
import waitForSelectorActivityFactory from "./waitForSelector";
import $evalActivityFactory from "./$eval";
import $$evalActivityFactory from "./$$eval";
import focusActivityFactory from "./focus";
import hoverActivityFactory from "./hover";

// keyboard
import downActivityFactory from "./keyboard/down";
import pressActivityFactory from "./keyboard/press";
import sendCharacterActivityFactory from "./keyboard/sendCharacter";
import keyboardTypeActivityFactory from "./keyboard/type";
import upActivityFactory from "./keyboard/up";

// mouse
import mouseClickActivityFactory from "./mouse/click";
import mouseDownActivityFactory from "./mouse/down";
import dragActivityFactory from "./mouse/drag";
import dragAndDropActivityFactory from "./mouse/dragAndDrop";
import dragEnterActivityFactory from "./mouse/dragEnter";
import dragOverActivityFactory from "./mouse/dragOver";
import dropActivityFactory from "./mouse/drop";
import moveActivityFactory from "./mouse/move";
import resetActivityFactory from "./mouse/reset";
import mouseUpActivityFactory from "./mouse/up";
import wheelActivityFactory from "./mouse/wheel";
import clearValue from "./clearValue";
import uploadFile from "./uploadFile";
import $ from "./$";
import $$ from "./$$";

register("c.browser", browserActivityFactory);
register("c.page", pageActivityFactory);

register("c.page.click", clickActivityFactory);
register("c.page.close", closeActivityFactory);
register("c.page.content", contentActivityFactory);
register("c.page.evaluate", evaluateActivityFactory);
register("c.page.eClick", evaluateClickActivityFactory);
register("c.page.fetch", fetchActivityFactory);
register("c.page.goBack", goBackActivityFactory);
register("c.page.goForward", goForwardActivityFactory);
register("c.page.isClosed", isClosedActivityFactory);
register("c.page.reload", reloadActivityFactory);
register("c.page.setCookie", setCookieActivityFactory);
register("c.page.setUserAgent", setUserAgentActivityFactory);
register("c.page.title", titleActivityFactory);
register("c.page.type", typeActivityFactory);
register("c.page.url", urlActivityFactory);
register("c.page.waitForNav", waitForNavActivityFactory);
register("c.page.waitForRequest", waitForRequestActivityFactory);
register("c.page.waitForResponse", waitForResponseActivityFactory);
register("c.page.waitForSelector", waitForSelectorActivityFactory);
register("c.page.getCookie", getCookieActivityFactory);
register("c.page.goto", gotoActivityFactory);
register("c.page.$eval", $evalActivityFactory);
register("c.page.$$eval", $$evalActivityFactory);
register("c.page.focus", focusActivityFactory);
register("c.page.hover", hoverActivityFactory);
register("c.page.clearValue", clearValue);
register("c.page.uploadFile", uploadFile)
register("c.page.$", $)
register("c.page.$$)", $$)

// keyboard
register("c.page.keyboard.down", downActivityFactory);
register("c.page.keyboard.up", upActivityFactory);
register("c.page.keyboard.sendCharacter", sendCharacterActivityFactory);
register("c.page.keyboard.type", keyboardTypeActivityFactory);
register("c.page.keyboard.press", pressActivityFactory);

// mouse
register("c.page.mouse.click", mouseClickActivityFactory);
register("c.page.mouse.down", mouseDownActivityFactory);
register("c.page.mouse.drag", dragActivityFactory);
register("c.page.mouse.dragAndDrop", dragAndDropActivityFactory);
register("c.page.mouse.dragEnter", dragEnterActivityFactory);
register("c.page.mouse.dragOver", dragOverActivityFactory);
register("c.page.mouse.drop", dropActivityFactory);
register("c.page.mouse.move", moveActivityFactory);
register("c.page.mouse.reset", resetActivityFactory);
register("c.page.mouse.up", mouseUpActivityFactory);
register("c.page.mouse.wheel", wheelActivityFactory);

export default factory;
export { register } from "../activityFactory";
