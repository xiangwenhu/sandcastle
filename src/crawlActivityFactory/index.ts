import factory, { register } from "../activityFactory";

import browserActivityFactory from "./browser";
import pageActivityFactory from "./page";

import clickActivityFactory from "./click";
import closeActivityFactory from "./close"
import contentActivityFactory from "./content";
import evaluateActivityFactory from "./evaluate";
import evaluateClickActivityFactory from "./evaluateClick";
import fetchTextActivityFactory from "./fetchText";
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


register("c.browser", browserActivityFactory);
register("page", pageActivityFactory);


register("c.page.click", clickActivityFactory);
register("c.page.close", closeActivityFactory);

register("c.page.content", contentActivityFactory);
register("c.page.evaluate", evaluateActivityFactory);
register("c.page.eClick", evaluateClickActivityFactory);
register("c.page.fetchText", fetchTextActivityFactory);
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

export default factory;
export { register } from "../activityFactory";
