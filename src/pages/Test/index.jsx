import React from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library";

const InputTypeRange = loadable(() => import(/* webpackChunkName: "InputTypeRange" */ "rkallan-ui-library/InputTypeRange"), {
    fallback: <Loading />,
});

const Test = () => {
    return (
        <div>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            <hr />
            <p variant="bold">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            <p variant="smaller">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            <p variant="larger">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            <nav>
                <ul>
                    <li>
                        <Link to={`${process.env.PUBLIC_URL}/login`}>Login Page</Link>
                    </li>
                    <li>
                        <Link to={`${process.env.PUBLIC_URL}/`}>Homepage</Link>
                    </li>
                </ul>
            </nav>

            <dl>
                <dt>NVDA:</dt>
                <dd>
                    Announces as <q>list</q>,
                </dd>
                <dd>
                    Counts both <code>&lt;dt&gt;</code> &amp; <code>&lt;dd&gt;</code> when providing the list item count,
                </dd>
                <dd>
                    Skips <code>&lt;dd&gt;</code>s when navigating by list item (<kbd>I</kbd>).
                </dd>
                <dt>JAWS:</dt>
                <dd>
                    Announces as <q>definition list</q>,
                </dd>
                <dd>
                    Counts only <code>&lt;dt&gt;</code>s when providing the list item count,
                </dd>
                <dd>
                    Skips <code>&lt;dd&gt;</code>s when navigating by list item (<kbd>I</kbd>).
                </dd>
                <dt>Voiceover (macOS):</dt>
                <dd>
                    Announces as <q>description list</q>,
                </dd>
                <dd>
                    Counts both <code>&lt;dt&gt;</code> &amp; <code>&lt;dd&gt;</code> when providing the list item count,
                </dd>
                <dt>Voiceover (iOS):</dt>
                <dd>Does not announce the presence of a list,</dd>
                <dd>Does not provide any count nor convey that the user is in a list,</dd>
                <dd>When navigating by lists, it is not recognized.</dd>
                <dt>TalkBack (Android):</dt>
                <dd>
                    Announces as <q>list</q>,
                </dd>
                <dd>
                    Counts both <code>&lt;dt&gt;</code> &amp; <code>&lt;dd&gt;</code> when providing the list item count,
                </dd>
                <dd>
                    Skips <code>&lt;dd&gt;</code>s when navigating by list item.
                </dd>
                <dd>
                    When focus is on a <code>&lt;dd&gt;</code>, after speaking the text it adds <q>definition</q>.
                </dd>
                <dt>Narrator</dt>
                <dd>
                    Announces as <q>list</q>,
                </dd>
                <dd>
                    Counts both <code>&lt;dt&gt;</code> &amp; <code>&lt;dd&gt;</code> when providing the list item count,
                </dd>
                <dd>There is no option to navigate by list or list item.</dd>
            </dl>

            <ul>
                <li>
                    test 1
                    <ul>
                        <li>
                            hoi
                            <ul>
                                <li>hoi</li>
                                <li>hoi</li>
                            </ul>
                        </li>
                        <li>hoi</li>
                    </ul>
                </li>
                <li>test 1</li>
                <li>test 1</li>
                <li>test 1</li>
            </ul>

            <ol type="I">
                <li>Coffee</li>
                <li>
                    Tea
                    <ol type="I">
                        <li>Coffee</li>
                        <li>Tea</li>
                    </ol>
                </li>
                <li>Milk</li>
                <li>Coffee</li>
            </ol>

            <InputTypeRange
                label={{ for: "valuta", text: "Amount", icon: undefined }}
                attributes={{
                    min: 0,
                    max: 25,
                    step: 0.01,
                    defaultValue: 0,
                    name: "valuta",
                    orient: "vertical",
                    variant: "vertical",
                    readOnly: true,
                }}
                output={{ show: true, unit: "€", prefix: true }}
            />
            <InputTypeRange
                attributes={{ min: 0, max: 25, step: 0.01, defaultValue: 10, name: "test", orient: "horizontal", variant: "horizontal" }}
                output={{ show: true, unit: "%", prefix: false, fixedDecimals: 2 }}
            />
        </div>
    );
};

export default Test;
