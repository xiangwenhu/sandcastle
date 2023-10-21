import factory, { register } from "../activityFactory";
import $Activity from "../crawlActivities/$";
import $$Activity from "../crawlActivities/$$";
import $$EvalActivity from "../crawlActivities/$$Eval";
import $EvalActivity from "../crawlActivities/$Eval";
import BrowserActivity from "../crawlActivities/Browser";
import ClearValueActivity from "../crawlActivities/ClearValue";
import ClickActivity from "../crawlActivities/Click";
import CloseActivity from "../crawlActivities/Close";
import ContentActivity from "../crawlActivities/Content";
import EvaluateActivity from "../crawlActivities/Evaluate";
import EvaluateClickActivity from "../crawlActivities/EvaluateClick";
import FetchActivity from "../crawlActivities/Fetch";
import FocusActivity from "../crawlActivities/Focus";
import GetCookieActivity from "../crawlActivities/GetCookie";
import GoBackActivity from "../crawlActivities/GoBack";
import GoForwardActivity from "../crawlActivities/GoForward";
import GotoActivity from "../crawlActivities/Goto";
import HoverActivity from "../crawlActivities/Hover";
import IsClosedActivity from "../crawlActivities/IsClosed";
import PageActivity from "../crawlActivities/Page";
import ReloadActivity from "../crawlActivities/Reload";
import SetCookieActivity from "../crawlActivities/SetCookie";
import SetUserAgentActivity from "../crawlActivities/SetUserAgent";
import TitleActivity from "../crawlActivities/Title";
import TypeActivity from "../crawlActivities/Type";
import URLActivity from "../crawlActivities/URL";
import UploadFileActivity from "../crawlActivities/UploadFile";
import WaitForNavActivity from "../crawlActivities/WaitForNav";
import WaitForRequestActivity from "../crawlActivities/WaitForRequest";
import WaitForResponseActivity from "../crawlActivities/WaitForResponse";
import WaitForSelectorActivity from "../crawlActivities/WaitForSelector";
import KeyboardDownActivity from "../crawlActivities/keyboard/Down";
import KeyboardUpActivity from "../crawlActivities/keyboard/Press";
import KeyboardSendCharacterActivity from "../crawlActivities/keyboard/SendCharacter";
import KeyboardTypeActivity from "../crawlActivities/keyboard/Type";
import MouseClickActivity from "../crawlActivities/mouse/Click";
import MouseDownActivity from "../crawlActivities/mouse/Down";
import MouseDragActivity from "../crawlActivities/mouse/Drag";
import MouseDragAndDropActivity from "../crawlActivities/mouse/DragAndDrop";
import MouseDragEnterActivity from "../crawlActivities/mouse/DragEnter";
import MouseDragOverActivity from "../crawlActivities/mouse/DragOver";
import MouseDropActivity from "../crawlActivities/mouse/Drop";
import MouseMoveActivity from "../crawlActivities/mouse/Move";
import MouseResetActivity from "../crawlActivities/mouse/Reset";
import MouseUpActivity from "../crawlActivities/mouse/Up";
import MouseWheelActivity from "../crawlActivities/mouse/Wheel";


register("c.browser", BrowserActivity, {
    params: ["options"]
});
register("c.page", PageActivity);

register("c.page.click", ClickActivity, {
    params: ["selector"]
});
register("c.page.close", CloseActivity);
register("c.page.content", ContentActivity);
register("c.page.evaluate", EvaluateActivity, {
    buildParams: ["code", "args"]
});
register("c.page.eClick", EvaluateClickActivity, {
    buildParams: ["selector"]
});
register("c.page.fetch", FetchActivity, {
    buildParams: ["url", "options", "contentType"]
});
register("c.page.goBack", GoBackActivity);
register("c.page.goForward", GoForwardActivity);
register("c.page.isClosed", IsClosedActivity);
register("c.page.reload", ReloadActivity, {
    buildParams: ["options"]
});
register("c.page.setCookie", SetCookieActivity, {
    buildParams: ["cookies"]
});
register("c.page.setUserAgent", SetUserAgentActivity, {
    buildParams: ["userAgent", "userAgentMetadata"]
});
register("c.page.title", TitleActivity);
register("c.page.type", TypeActivity, {
    buildParams: ["selector", "text", "options"]
});
register("c.page.url", URLActivity);
register("c.page.waitForNav", WaitForNavActivity, {
    buildParams: ["options"]
});
register("c.page.waitForRequest", WaitForRequestActivity, {
    buildParams: ["urlOrPredicate", "options"]
});
register("c.page.waitForResponse", WaitForResponseActivity, {
    buildParams: ["urlOrPredicate", "options"]
});
register("c.page.waitForSelector", WaitForSelectorActivity, {
    buildParams: ["selector", "options"]
});
register("c.page.getCookie", GetCookieActivity);
register("c.page.goto", GotoActivity, {
    params: ["url", "options"]
});
register("c.page.$eval", $EvalActivity), {
    buildParams: ["selector", "pageFunction"]
};
register("c.page.$$eval", $$EvalActivity, {
    buildParams: ["selector", "pageFunction"]
});
register("c.page.focus", FocusActivity, {
    buildParams: ["selector"]
});
register("c.page.hover", HoverActivity, {
    buildParams: ["selector"]
});
register("c.page.clearValue", ClearValueActivity, {
    params: ["selector"]
});
register("c.page.uploadFile", UploadFileActivity, {
    buildParams: ["selector", "paths"]
})
register("c.page.$", $Activity, {
    buildParams: ["selector"]
})
register("c.page.$$)", $$Activity, {
    buildParams: ["selector"]
})

// keyboard
register("c.page.keyboard.down", KeyboardDownActivity, {
    buildParams: ["key", "options"]
});
register("c.page.keyboard.up", KeyboardUpActivity, {
    buildParams: ["key", "options"]
});
register("c.page.keyboard.sendCharacter", KeyboardSendCharacterActivity, {
    buildParams: ["key"]
});
register("c.page.keyboard.type", KeyboardTypeActivity, {
    buildParams: ["key"]
});
register("c.page.keyboard.press", KeyboardUpActivity, {
    buildParams: ["key"]
});

// mouse
register("c.page.mouse.click", MouseClickActivity, {
    buildParams: ["x", "y", "options"]
});
register("c.page.mouse.down", MouseDownActivity, {
    buildParams: ["options"]
});
register("c.page.mouse.drag", MouseDragActivity, {
    buildParams: ["start", "target"]
});
register("c.page.mouse.dragAndDrop", MouseDragAndDropActivity, {
    buildParams: ["start", "target", "options"]
});
register("c.page.mouse.dragEnter", MouseDragEnterActivity, {
    buildParams: ["target", "data"]
});
register("c.page.mouse.dragOver", MouseDragOverActivity, {
    buildParams: ["target", "data"]
});
register("c.page.mouse.drop", MouseDropActivity, {
    buildParams: ["target", "data"]
});
register("c.page.mouse.move", MouseMoveActivity, {
    buildParams: ["x", "y", "options"]
});
register("c.page.mouse.reset", MouseResetActivity);
register("c.page.mouse.up", MouseUpActivity, {
    buildParams: ["options"]
});
register("c.page.mouse.wheel", MouseWheelActivity, {
    buildParams: ["options"]
});

export default factory;
