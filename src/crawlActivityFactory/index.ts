import factory, { register } from "../activityFactory";

import browserActivityFactory from "./browser";
import pageActivityFactory from "./page";
import getCookieActivityFactory from "./getCookie";
import gotoActivityFactory from "./goto";

register("c.browser", browserActivityFactory);
register("c.page", pageActivityFactory);
register("c.page.getCookie", getCookieActivityFactory);
register("c.page.goto", gotoActivityFactory);

export default factory;
export { register } from "../activityFactory";
