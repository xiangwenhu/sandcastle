import { ActConfigFor, ActivityType } from "../types/activity";

// 辅助类型，用于创建不包含 'type' 的活动配置类型
type ActivityConfigWithoutType<Type extends ActivityType> = Omit<ActConfigFor<Type>, 'type'>;


export namespace $$ {
    // 辅助函数，用于创建带有正确类型的活动配置
    function createActivity<Type extends ActivityType>(
        type: Type,
        config: ActivityConfigWithoutType<Type>
    ): ActConfigFor<Type> {
        return { ...config, type } as ActConfigFor<Type>;
    }

    // 为每种类型的活动创建静态方法，使用新的辅助类型

    export function break_(config: ActivityConfigWithoutType<'break'>): ActConfigFor<'break'> {
        return createActivity('break', config);
    }

    export function code(config: ActivityConfigWithoutType<'code'>): ActConfigFor<'code'> {
        return createActivity('code', config);
    }

    export function delay(config: ActivityConfigWithoutType<'delay'>): ActConfigFor<'delay'> {
        return createActivity('delay', config);
    }

    export function doWhile(config: ActivityConfigWithoutType<'doWhile'>): ActConfigFor<'doWhile'> {
        return createActivity('doWhile', config);
    }

    export function for_(config: ActivityConfigWithoutType<'for'>): ActConfigFor<'for'> {
        return createActivity('for', config);
    }

    export function function_(config: ActivityConfigWithoutType<'function'>): ActConfigFor<'function'> {
        return createActivity('function', config);
    }

    export function ifElse(config: ActivityConfigWithoutType<'ifElse'>): ActConfigFor<'ifElse'> {
        return createActivity('ifElse', config);
    }

    export function parallel(config: ActivityConfigWithoutType<'parallel'>): ActConfigFor<'parallel'> {
        return createActivity('parallel', config);
    }

    export function parallelFor(config: ActivityConfigWithoutType<'parallelFor'>): ActConfigFor<'parallelFor'> {
        return createActivity('parallelFor', config);
    }

    export function race(config: ActivityConfigWithoutType<'race'>): ActConfigFor<'race'> {
        return createActivity('race', config);
    }

    export function request(config: ActivityConfigWithoutType<'request'>): ActConfigFor<'request'> {
        return createActivity('request', config);
    }

    export function sequence(config: ActivityConfigWithoutType<'sequence'>): ActConfigFor<'sequence'> {
        return createActivity('sequence', config);
    }

    export function terminate(config: ActivityConfigWithoutType<'terminate'>): ActConfigFor<'terminate'> {
        return createActivity('terminate', config);
    }

    export function tryCatch(config: ActivityConfigWithoutType<'tryCatch'>): ActConfigFor<'tryCatch'> {
        return createActivity('tryCatch', config);
    }

    export function while_(config: ActivityConfigWithoutType<'while'>): ActConfigFor<'while'> {
        return createActivity('while', config);
    }

    export function fsDownloadFile(config: ActivityConfigWithoutType<'fs.downloadFile'>): ActConfigFor<'fs.downloadFile'> {
        return createActivity('fs.downloadFile', config);
    }

    export function fsWriteFile(config: ActivityConfigWithoutType<'fs.writeFile'>): ActConfigFor<'fs.writeFile'> {
        return createActivity('fs.writeFile', config);
    }

    export function fsReadFile(config: ActivityConfigWithoutType<'fs.readFile'>): ActConfigFor<'fs.readFile'> {
        return createActivity('fs.readFile', config);
    }

    export function fsRemoveFile(config: ActivityConfigWithoutType<'fs.removeFile'>): ActConfigFor<'fs.removeFile'> {
        return createActivity('fs.removeFile', config);
    }

    export function vCreate(config: ActivityConfigWithoutType<'v.create'>): ActConfigFor<'v.create'> {
        return createActivity('v.create', config);
    }

    export function vDelete(config: ActivityConfigWithoutType<'v.delete'>): ActConfigFor<'v.delete'> {
        return createActivity('v.delete', config);
    }

    export namespace c {

        export function page(config: ActivityConfigWithoutType<'c.page'>){
            return createActivity('c.page', config);
        }

        export namespace page {
            export function click(config: ActivityConfigWithoutType<'c.page.click'>): ActConfigFor<'c.page.click'> {
                return createActivity('c.page.click', config);
            }

            export function close(config: ActivityConfigWithoutType<'c.page.close'>): ActConfigFor<'c.page.close'> {
                return createActivity('c.page.close', config);
            }

            export function content(config: ActivityConfigWithoutType<'c.page.content'>): ActConfigFor<'c.page.content'> {
                return createActivity('c.page.content', config);
            }

            export function evaluate(config: ActivityConfigWithoutType<'c.page.evaluate'>): ActConfigFor<'c.page.evaluate'> {
                return createActivity('c.page.evaluate', config);
            }

            export function eClick(config: ActivityConfigWithoutType<'c.page.eClick'>): ActConfigFor<'c.page.eClick'> {
                return createActivity('c.page.eClick', config);
            }

            export function fetch(config: ActivityConfigWithoutType<'c.page.fetch'>): ActConfigFor<'c.page.fetch'> {
                return createActivity('c.page.fetch', config);
            }

            export function goBack(config: ActivityConfigWithoutType<'c.page.goBack'>): ActConfigFor<'c.page.goBack'> {
                return createActivity('c.page.goBack', config);
            }

            export function goForward(config: ActivityConfigWithoutType<'c.page.goForward'>): ActConfigFor<'c.page.goForward'> {
                return createActivity('c.page.goForward', config);
            }

            export function isClosed(config: ActivityConfigWithoutType<'c.page.isClosed'>): ActConfigFor<'c.page.isClosed'> {
                return createActivity('c.page.isClosed', config);
            }

            export function reload(config: ActivityConfigWithoutType<'c.page.reload'>): ActConfigFor<'c.page.reload'> {
                return createActivity('c.page.reload', config);
            }

            export function setCookie(config: ActivityConfigWithoutType<'c.page.setCookie'>): ActConfigFor<'c.page.setCookie'> {
                return createActivity('c.page.setCookie', config);
            }

            export function setUserAgent(config: ActivityConfigWithoutType<'c.page.setUserAgent'>): ActConfigFor<'c.page.setUserAgent'> {
                return createActivity('c.page.setUserAgent', config);
            }

            export function title(config: ActivityConfigWithoutType<'c.page.title'>): ActConfigFor<'c.page.title'> {
                return createActivity('c.page.title', config);
            }

            export function type_(config: ActivityConfigWithoutType<'c.page.type'>): ActConfigFor<'c.page.type'> {
                return createActivity('c.page.type', config);
            }

            export function url(config: ActivityConfigWithoutType<'c.page.url'>): ActConfigFor<'c.page.url'> {
                return createActivity('c.page.url', config);
            }

            export function waitForNavigation(config: ActivityConfigWithoutType<'c.page.waitForNavigation'>): ActConfigFor<'c.page.waitForNavigation'> {
                return createActivity('c.page.waitForNavigation', config);
            }

            export function waitForRequest(config: ActivityConfigWithoutType<'c.page.waitForRequest'>): ActConfigFor<'c.page.waitForRequest'> {
                return createActivity('c.page.waitForRequest', config);
            }

            export function waitForResponse(config: ActivityConfigWithoutType<'c.page.waitForResponse'>): ActConfigFor<'c.page.waitForResponse'> {
                return createActivity('c.page.waitForResponse', config);
            }

            export function waitForSelector(config: ActivityConfigWithoutType<'c.page.waitForSelector'>): ActConfigFor<'c.page.waitForSelector'> {
                return createActivity('c.page.waitForSelector', config);
            }

            export function cookies(config: ActivityConfigWithoutType<'c.page.cookies'>): ActConfigFor<'c.page.cookies'> {
                return createActivity('c.page.cookies', config);
            }

            export function goto(config: ActivityConfigWithoutType<'c.page.goto'>): ActConfigFor<'c.page.goto'> {
                return createActivity('c.page.goto', config);
            }

            export function $eval(config: ActivityConfigWithoutType<'c.page.$eval'>): ActConfigFor<'c.page.$eval'> {
                return createActivity('c.page.$eval', config);
            }

            export function $$eval(config: ActivityConfigWithoutType<'c.page.$$eval'>): ActConfigFor<'c.page.$$eval'> {
                return createActivity('c.page.$$eval', config);
            }

            export function focus(config: ActivityConfigWithoutType<'c.page.focus'>): ActConfigFor<'c.page.focus'> {
                return createActivity('c.page.focus', config);
            }

            export function hover(config: ActivityConfigWithoutType<'c.page.hover'>): ActConfigFor<'c.page.hover'> {
                return createActivity('c.page.hover', config);
            }

            export function clearValue(config: ActivityConfigWithoutType<'c.page.clearValue'>): ActConfigFor<'c.page.clearValue'> {
                return createActivity('c.page.clearValue', config);
            }

            export function uploadFile(config: ActivityConfigWithoutType<'c.page.uploadFile'>): ActConfigFor<'c.page.uploadFile'> {
                return createActivity('c.page.uploadFile', config);
            }

            export function $(config: ActivityConfigWithoutType<'c.page.$'>): ActConfigFor<'c.page.$'> {
                return createActivity('c.page.$', config);
            }

            export function $$(config: ActivityConfigWithoutType<'c.page.$$'>): ActConfigFor<'c.page.$$'> {
                return createActivity('c.page.$$', config);
            }

            // keyboard
            export namespace keyboard {
                export function down(config: ActivityConfigWithoutType<'c.page.keyboard.down'>): ActConfigFor<'c.page.keyboard.down'> {
                    return createActivity('c.page.keyboard.down', config);
                }

                export function up(config: ActivityConfigWithoutType<'c.page.keyboard.up'>): ActConfigFor<'c.page.keyboard.up'> {
                    return createActivity('c.page.keyboard.up', config);
                }

                export function sendCharacter(config: ActivityConfigWithoutType<'c.page.keyboard.sendCharacter'>): ActConfigFor<'c.page.keyboard.sendCharacter'> {
                    return createActivity('c.page.keyboard.sendCharacter', config);
                }

                export function type_(config: ActivityConfigWithoutType<'c.page.keyboard.type'>): ActConfigFor<'c.page.keyboard.type'> {
                    return createActivity('c.page.keyboard.type', config);
                }

                export function press(config: ActivityConfigWithoutType<'c.page.keyboard.press'>): ActConfigFor<'c.page.keyboard.press'> {
                    return createActivity('c.page.keyboard.press', config);
                }
            }

            // mouse
            export namespace mouse {
                export function click(config: ActivityConfigWithoutType<'c.page.mouse.click'>): ActConfigFor<'c.page.mouse.click'> {
                    return createActivity('c.page.mouse.click', config);
                }

                export function down(config: ActivityConfigWithoutType<'c.page.mouse.down'>): ActConfigFor<'c.page.mouse.down'> {
                    return createActivity('c.page.mouse.down', config);
                }

                export function drag(config: ActivityConfigWithoutType<'c.page.mouse.drag'>): ActConfigFor<'c.page.mouse.drag'> {
                    return createActivity('c.page.mouse.drag', config);
                }

                export function dragAndDrop(config: ActivityConfigWithoutType<'c.page.mouse.dragAndDrop'>): ActConfigFor<'c.page.mouse.dragAndDrop'> {
                    return createActivity('c.page.mouse.dragAndDrop', config);
                }

                export function dragEnter(config: ActivityConfigWithoutType<'c.page.mouse.dragEnter'>): ActConfigFor<'c.page.mouse.dragEnter'> {
                    return createActivity('c.page.mouse.dragEnter', config);
                }

                export function dragOver(config: ActivityConfigWithoutType<'c.page.mouse.dragOver'>): ActConfigFor<'c.page.mouse.dragOver'> {
                    return createActivity('c.page.mouse.dragOver', config);
                }

                export function drop(config: ActivityConfigWithoutType<'c.page.mouse.drop'>): ActConfigFor<'c.page.mouse.drop'> {
                    return createActivity('c.page.mouse.drop', config);
                }

                export function move(config: ActivityConfigWithoutType<'c.page.mouse.move'>): ActConfigFor<'c.page.mouse.move'> {
                    return createActivity('c.page.mouse.move', config);
                }

                export function reset(config: ActivityConfigWithoutType<'c.page.mouse.reset'>): ActConfigFor<'c.page.mouse.reset'> {
                    return createActivity('c.page.mouse.reset', config);
                }

                export function up(config: ActivityConfigWithoutType<'c.page.mouse.up'>): ActConfigFor<'c.page.mouse.up'> {
                    return createActivity('c.page.mouse.up', config);
                }

                export function wheel(config: ActivityConfigWithoutType<'c.page.mouse.wheel'>): ActConfigFor<'c.page.mouse.wheel'> {
                    return createActivity('c.page.mouse.wheel', config);
                }
            }

            export function exposeFunction(config: ActivityConfigWithoutType<'c.page.exposeFunction'>): ActConfigFor<'c.page.exposeFunction'> {
                return createActivity('c.page.exposeFunction', config);
            }

            export function removeExposedFunction(config: ActivityConfigWithoutType<'c.page.removeExposedFunction'>): ActConfigFor<'c.page.removeExposedFunction'> {
                return createActivity('c.page.removeExposedFunction', config);
            }

            export function pdf(config: ActivityConfigWithoutType<'c.page.pdf'>): ActConfigFor<'c.page.pdf'> {
                return createActivity('c.page.pdf', config);
            }

            export function screenshot(config: ActivityConfigWithoutType<'c.page.screenshot'>): ActConfigFor<'c.page.screenshot'> {
                return createActivity('c.page.screenshot', config);
            }

            export function setViewport(config: ActivityConfigWithoutType<'c.page.setViewport'>): ActConfigFor<'c.page.setViewport'> {
                return createActivity('c.page.setViewport', config);
            }

            export function setRequestInterception(config: ActivityConfigWithoutType<'c.page.setRequestInterception'>): ActConfigFor<'c.page.setRequestInterception'> {
                return createActivity('c.page.setRequestInterception', config);
            }

            export function setExtraHTTPHeaders(config: ActivityConfigWithoutType<'c.page.setExtraHTTPHeaders'>): ActConfigFor<'c.page.setExtraHTTPHeaders'> {
                return createActivity('c.page.setExtraHTTPHeaders', config);
            }

            export function setGeolocation(config: ActivityConfigWithoutType<'c.page.setGeolocation'>): ActConfigFor<'c.page.setGeolocation'> {
                return createActivity('c.page.setGeolocation', config);
            }

            export function addScriptTag(config: ActivityConfigWithoutType<'c.page.addScriptTag'>): ActConfigFor<'c.page.addScriptTag'> {
                return createActivity('c.page.addScriptTag', config);
            }

            export function addStyleTag(config: ActivityConfigWithoutType<'c.page.addStyleTag'>): ActConfigFor<'c.page.addStyleTag'> {
                return createActivity('c.page.addStyleTag', config);
            }

            export function select(config: ActivityConfigWithoutType<'c.page.select'>): ActConfigFor<'c.page.select'> {
                return createActivity('c.page.select', config);
            }

            export function action(config: ActivityConfigWithoutType<'c.page.action'>): ActConfigFor<'c.page.action'> {
                return createActivity('c.page.action', config);
            }

            export function property(config: ActivityConfigWithoutType<'c.page.property'>): ActConfigFor<'c.page.property'> {
                return createActivity('c.page.property', config);
            }
        }

        export function browser(config: ActivityConfigWithoutType<'c.browser'>): ActConfigFor<'c.browser'> {
            return createActivity('c.browser', config);
        }
    }
}