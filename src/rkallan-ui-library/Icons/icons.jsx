import React from "react";
import styles from "./resources/styles/icons.module.scss";
import { ReactComponent as AdminFlow } from "./resources/svg/admin-flow.svg";
import { ReactComponent as AgentMapping } from "./resources/svg/agent-mapping.svg";
import { ReactComponent as Agent } from "./resources/svg/agent.svg";
import { ReactComponent as Agents } from "./resources/svg/agents.svg";
import { ReactComponent as Alert } from "./resources/svg/alert.svg";
import { ReactComponent as ArrowDown } from "./resources/svg/arrow-down.svg";
import { ReactComponent as ArrowLeft } from "./resources/svg/arrow-left.svg";
import { ReactComponent as ArrowRight } from "./resources/svg/arrow-right.svg";
import { ReactComponent as ArrowUp } from "./resources/svg/arrow-up.svg";
import { ReactComponent as Asterisk } from "./resources/svg/asterisk.svg";
import { ReactComponent as Chat } from "./resources/svg/chat.svg";
import { ReactComponent as Clock } from "./resources/svg/clock.svg";
import { ReactComponent as CloseCross } from "./resources/svg/close-cross.svg";
import { ReactComponent as Close } from "./resources/svg/close.svg";
import { ReactComponent as Confirm } from "./resources/svg/confirm.svg";
import { ReactComponent as Copy } from "./resources/svg/copy.svg";
import { ReactComponent as DropdownCaret } from "./resources/svg/dropdown-caret.svg";
import { ReactComponent as Email } from "./resources/svg/email.svg";
import { ReactComponent as Export } from "./resources/svg/export.svg";
import { ReactComponent as FlowIvr } from "./resources/svg/flow-ivr.svg";
import { ReactComponent as Hamburger } from "./resources/svg/hamburger.svg";
import { ReactComponent as Help } from "./resources/svg/help.svg";
import { ReactComponent as Hint } from "./resources/svg/hint.svg";
import { ReactComponent as Home } from "./resources/svg/home.svg";
import { ReactComponent as HuntGroup } from "./resources/svg/hunt-group.svg";
import { ReactComponent as Inbound } from "./resources/svg/inbound.svg";
import { ReactComponent as Logout } from "./resources/svg/logout.svg";
import { ReactComponent as Microphone } from "./resources/svg/microphone.svg";
import { ReactComponent as Minus } from "./resources/svg/minus.svg";
import { ReactComponent as OpenUrl } from "./resources/svg/open-url.svg";
import { ReactComponent as Organisation } from "./resources/svg/organisation.svg";
import { ReactComponent as OutboundCall } from "./resources/svg/outbound-call.svg";
import { ReactComponent as Password } from "./resources/svg/password.svg";
import { ReactComponent as Paste } from "./resources/svg/paste.svg";
import { ReactComponent as Phone } from "./resources/svg/phone.svg";
import { ReactComponent as Plus } from "./resources/svg/plus.svg";
import { ReactComponent as Queue } from "./resources/svg/queue.svg";
import { ReactComponent as Queue2 } from "./resources/svg/queue2.svg";
import { ReactComponent as Save } from "./resources/svg/save.svg";
import { ReactComponent as Search } from "./resources/svg/search.svg";
import { ReactComponent as SelectCaret } from "./resources/svg/select-caret.svg";
import { ReactComponent as Share } from "./resources/svg/share.svg";
import { ReactComponent as Share2 } from "./resources/svg/share2.svg";
import { ReactComponent as Submit } from "./resources/svg/submit.svg";
import { ReactComponent as Trash } from "./resources/svg/trash.svg";
import { ReactComponent as User } from "./resources/svg/user.svg";
import { ReactComponent as Users } from "./resources/svg/users.svg";
import { ReactComponent as VoiceApplication } from "./resources/svg/voice-application.svg";
import { ReactComponent as Outbound } from "./resources/svg/Outbound Call-01.svg";
import { ReactComponent as AppendString } from "./resources/svg/Append String-01.svg";
import { ReactComponent as AssignVariable } from "./resources/svg/Assign Variable-01.svg";
import { ReactComponent as CompareVariables } from "./resources/svg/Compare Variables-01.svg";
import { ReactComponent as ConvertCase } from "./resources/svg/Convert Case-01.svg";
import { ReactComponent as DataManagement } from "./resources/svg/Data Management-01.svg";
import { ReactComponent as ExtractString } from "./resources/svg/Exact String-01.svg";
import { ReactComponent as FindString } from "./resources/svg/Find String-01.svg";
import { ReactComponent as FormatString } from "./resources/svg/Format String-01.svg";
import { ReactComponent as GetDate } from "./resources/svg/Get Date-01.svg";
import { ReactComponent as InsertString } from "./resources/svg/Insert String-01.svg";
import { ReactComponent as LoopTo } from "./resources/svg/Loop To-01.svg";
import { ReactComponent as Menu } from "./resources/svg/Menu-01.svg";
import { ReactComponent as Multiply } from "./resources/svg/Multiply-01.svg";
import { ReactComponent as ParseString } from "./resources/svg/Parse String-01.svg";
import { ReactComponent as PercentageSplit } from "./resources/svg/Percentage Split-01.svg";
import { ReactComponent as PlayMedia } from "./resources/svg/Play Media-01.svg";
import { ReactComponent as PlayRecording } from "./resources/svg/Play Recording-01.svg";
import { ReactComponent as Record } from "./resources/svg/Record-01.svg";
import { ReactComponent as RouteToContact } from "./resources/svg/Route to Contact-01.svg";
import { ReactComponent as RouteToService } from "./resources/svg/Route to Service-01.svg";
import { ReactComponent as SelectCase } from "./resources/svg/Select Case-01.svg";
import { ReactComponent as SendEmail } from "./resources/svg/Send Email-01.svg";
import { ReactComponent as SendIMMessage } from "./resources/svg/Send IM Message-01.svg";
import { ReactComponent as Sleep } from "./resources/svg/Sleep-01.svg";
import { ReactComponent as Sms } from "./resources/svg/SMS-01.svg";
import { ReactComponent as SpeechToText } from "./resources/svg/Speech to Text-01.svg";
import { ReactComponent as StringLength } from "./resources/svg/String Length-01.svg";
import { ReactComponent as Subtract } from "./resources/svg/Subtract-01.svg";
import { ReactComponent as TextToSpeech } from "./resources/svg/Text to Speech-01.svg";

const icons = {
    accesspoints: (props) => {
        return <Phone className={styles.icon} {...props} />;
    },
    adminFlow: (props) => {
        return <AdminFlow className={styles.icon} {...props} />;
    },
    agentMapping: (props) => {
        return <AgentMapping className={styles.icon} {...props} />;
    },
    agent: (props) => {
        return <Agent className={styles.icon} {...props} />;
    },
    agents: (props) => {
        return <Agents className={styles.icon} {...props} />;
    },
    alert: (props) => {
        return <Alert className={styles.icon} {...props} />;
    },
    arrowDown: (props) => {
        return <ArrowDown className={styles.icon} {...props} />;
    },
    arrowLeft: (props) => {
        return <ArrowLeft className={styles.icon} {...props} />;
    },
    arrowRight: (props) => {
        return <ArrowRight className={styles.icon} {...props} />;
    },
    arrowUp: (props) => {
        return <ArrowUp className={styles.icon} {...props} />;
    },
    asterix: (props) => {
        return <Asterisk className={styles.icon} {...props} />;
    },
    back: (props) => {
        return <ArrowLeft className={styles.icon} {...props} />;
    },
    chat: (props) => {
        return <Chat className={styles.icon} {...props} />;
    },
    clock: (props) => {
        return <Clock className={styles.icon} {...props} />;
    },
    close: (props) => {
        return <Close className={styles.icon} {...props} />;
    },
    closeCross: (props) => {
        return <CloseCross className={styles.icon} {...props} />;
    },
    confirm: (props) => {
        return <Confirm className={styles.icon} {...props} />;
    },
    copy: (props) => {
        return <Copy className={styles.icon} {...props} />;
    },
    dropdownCaret: (props) => {
        return <DropdownCaret className={styles.icon} {...props} />;
    },
    email: (props) => {
        return <Email className={styles.icon} {...props} />;
    },
    export: (props) => {
        return <Export className={styles.icon} {...props} />;
    },
    hamburger: (props) => {
        return <Hamburger className={styles.icon} {...props} />;
    },
    home: (props) => {
        return <Home className={styles.icon} {...props} />;
    },
    help: (props) => {
        return <Help className={styles.icon} {...props} />;
    },
    hint: (props) => {
        return <Hint className={styles.icon} {...props} />;
    },
    huntGroup: (props) => {
        return <HuntGroup className={styles.icon} {...props} />;
    },
    inbound: (props) => {
        return <Inbound className={styles.icon} {...props} />;
    },
    logout: (props) => {
        return <Logout className={styles.icon} {...props} />;
    },
    microphone: (props) => {
        return <Microphone className={styles.icon} {...props} />;
    },
    minus: (props) => {
        return <Minus className={styles.icon} {...props} />;
    },
    ivrs: (props) => {
        return <FlowIvr className={styles.icon} {...props} />;
    },
    openUrl: (props) => {
        return <OpenUrl className={styles.icon} {...props} />;
    },
    organisation: (props) => {
        return <Organisation className={styles.icon} {...props} />;
    },
    outboundcall: (props) => {
        return <OutboundCall className={styles.icon} {...props} />;
    },
    password: (props) => {
        return <Password className={styles.icon} {...props} />;
    },
    paste: (props) => {
        return <Paste className={styles.icon} {...props} />;
    },
    phone: (props) => {
        return <Phone className={styles.icon} {...props} />;
    },
    plus: (props) => {
        return <Plus className={styles.icon} {...props} />;
    },
    queue: (props) => {
        return <Queue className={styles.icon} {...props} />;
    },
    queue2: (props) => {
        return <Queue2 className={styles.icon} {...props} />;
    },
    queues: (props) => {
        return <Clock className={styles.icon} {...props} />;
    },
    save: (props) => {
        return <Save className={styles.icon} {...props} />;
    },
    selectCaret: (props) => {
        return <SelectCaret className={styles.icon} {...props} />;
    },
    share: (props) => {
        return <Share className={styles.icon} {...props} />;
    },
    share2: (props) => {
        return <Share2 className={styles.icon} {...props} />;
    },
    search: (props) => {
        return <Search className={styles.icon} {...props} />;
    },
    sms: (props) => {
        return <Sms className={styles.icon} {...props} />;
    },
    submit: (props) => {
        return <Submit className={styles.icon} {...props} />;
    },
    start: (props) => {
        return <Submit className={styles.icon} {...props} />;
    },
    trash: (props) => {
        return <Trash className={styles.icon} {...props} />;
    },
    user: (props) => {
        return <User className={styles.icon} {...props} />;
    },
    users: (props) => {
        return <Users className={styles.icon} {...props} />;
    },
    voiceApplication: (props) => {
        return <VoiceApplication className={styles.icon} {...props} />;
    },
    fallback: (props) => {
        return <Hint className={styles.icon} {...props} />;
    },
    outboundCall: (props) => {
        return <Outbound className={styles.icon} {...props} />;
    },
    appendstring: (props) => {
        return <AppendString className={styles.icon} {...props} />;
    },
    assignVariable: (props) => {
        return <AssignVariable className={styles.icon} {...props} />;
    },
    compareVariables: (props) => {
        return <CompareVariables className={styles.icon} {...props} />;
    },
    convertcase: (props) => {
        return <ConvertCase className={styles.icon} {...props} />;
    },
    datamanagement: (props) => {
        return <DataManagement className={styles.icon} {...props} />;
    },
    extractstring: (props) => {
        return <ExtractString className={styles.icon} {...props} />;
    },
    findstring: (props) => {
        return <FindString className={styles.icon} {...props} />;
    },
    formatString: (props) => {
        return <FormatString className={styles.icon} {...props} />;
    },
    getdate: (props) => {
        return <GetDate className={styles.icon} {...props} />;
    },
    insertstring: (props) => {
        return <InsertString className={styles.icon} {...props} />;
    },
    loopTo: (props) => {
        return <LoopTo className={styles.icon} {...props} />;
    },
    menu: (props) => {
        return <Menu className={styles.icon} {...props} />;
    },
    parsestring: (props) => {
        return <ParseString className={styles.icon} {...props} />;
    },
    multiply: (props) => {
        return <Multiply className={styles.icon} {...props} />;
    },
    percentagesplit: (props) => {
        return <PercentageSplit className={styles.icon} {...props} />;
    },
    playMedia: (props) => {
        return <PlayMedia className={styles.icon} {...props} />;
    },
    playrecording: (props) => {
        return <PlayRecording className={styles.icon} {...props} />;
    },
    record: (props) => {
        return <Record className={styles.icon} {...props} />;
    },
    routeToContact: (props) => {
        return <RouteToContact className={styles.icon} {...props} />;
    },
    routetoservice: (props) => {
        return <RouteToService className={styles.icon} {...props} />;
    },
    selectCase: (props) => {
        return <SelectCase className={styles.icon} {...props} />;
    },
    sendemail: (props) => {
        return <SendEmail className={styles.icon} {...props} />;
    },
    sendimmessage: (props) => {
        return <SendIMMessage className={styles.icon} {...props} />;
    },
    sleep: (props) => {
        return <Sleep className={styles.icon} {...props} />;
    },
    speechtotext: (props) => {
        return <SpeechToText className={styles.icon} {...props} />;
    },
    stringlength: (props) => {
        return <StringLength className={styles.icon} {...props} />;
    },
    subtract: (props) => {
        return <Subtract className={styles.icon} {...props} />;
    },
    tts: (props) => {
        return <TextToSpeech className={styles.icon} {...props} />;
    },
};

export default icons;
