import {Calendar} from "@/common/Calendar/Calendar";
import {Input} from "@/common/Form/Input/Input";
import {Label} from "@/common/Form/Label/Label";
import {Textarea} from "@/common/Form/Textarea/Textarea";
import {AnimatedModal} from "@/common/Modal/AnimatedModal";
import Rounded from "@/common/RoundedButton";
import {useState} from "react";
import {cn} from "../../../../lib/utils";
import contact from '../../../../data/contact.json'

export default function Form({dates = [] }) {
    const [load, setLoad] = useState(false)
    const [status, setStatus] = useState(false)
    const [modalTitle, setModalTitle] = useState('Thank you for booking!')
    const [modalContent, setModalContent] = useState('I will reach you soon to discuss details. Have a nice day! 😊')
    const [form, setForm] = useState({
        name: null,
        lastname: null,
        email: null,
        description: null,
        date: null
    });
    const [errors, setErrors] = useState({
        name: null,
        lastname: null,
        email: null,
        description: null,
        date: null
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true)
        if (validate()) {
            await sendDiscordMessage()
        }
        setLoad(false)
    };

    const validate = () => {
        let newErrors = {...errors}
        let withError = true
        Object.keys(errors).forEach((key) => {
            const errorMessage = validateFiled(key)
            if (errorMessage) {
                withError = false
            }
            newErrors[key] = errorMessage
        })
        setErrors(newErrors)
        return withError
    }

    const validateFiled = (fieldName) => {
        if (fieldName !== 'email' && (form[fieldName] === null || form[fieldName] === '')) {
            return `Field is required`
        }
        if (fieldName === 'email' && (form[fieldName] === null || !validateEmail(form[fieldName]))) {
            return 'Field email is incorrect'
        }
        return null
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const sendDiscordMessage = async () => {
        await fetch(contact.discord, {
            body: JSON.stringify({
                content: `### ${form.name} ${form.lastname} \n email: **${form.email}** \n \`\`\` ${form.description} \`\`\` \n book date: ${form.date}`,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
            .then(function (res) {
                console.log(res);
                setStatus(true)
            })
            .catch(function (res) {
                setStatus(true)
                setModalTitle("I'm sorry")
                setModalContent('Something went wrong 😔. Please, try later.')
                console.log(res);
            });
    }

    const changeForm = (key, newValue,) => {
        setForm({
            ...form, [key]: newValue
        })
    }
    return (
        <>
                <div
                    className=" lg:flex lg:flex-row-reverse lg:justify-center "
                >
                    <div className="w-full md:w-full p-8">
                        <form className="my-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer>
                                    <Label htmlFor="firstname" className="ml-1">First name</Label>
                                    <Input id="firstname" placeholder="First name" type="text" disabled={load}
                                           error={!!errors.name}
                                           className={!!errors.name ? "dark:placeholder-red-500" : ''}
                                           onChange={(e) => changeForm('name', e.target.value)}/>
                                    {!!errors.name && <p id="helper-text-name"
                                                         className="mt-1 ml-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
                                </LabelInputContainer>
                                <LabelInputContainer>
                                    <Label htmlFor="lastname" className="ml-1">Last name</Label>
                                    <Input id="lastname" placeholder="Last name" type="text" disabled={load}
                                           error={!!errors.lastname}
                                           className={!!errors.lastname ? "dark:placeholder-red-500" : ''}
                                           onChange={(e) => changeForm('lastname', e.target.value)}/>
                                    {!!errors.lastname && <p id="helper-text-lastname"
                                                             className="mt-1 ml-1 text-sm text-red-500 dark:text-red-400">{errors.lastname}</p>}
                                </LabelInputContainer>
                            </div>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email" className="ml-1">Email Address</Label>
                                <Input id="email" placeholder="youarehandsome@somemail.com" type="email" disabled={load}
                                       error={!!errors.email}
                                       className={!!errors.email ? "dark:placeholder-red-500" : ''}
                                       onChange={(e) => changeForm('email', e.target.value)}/>
                                {!!errors.email && <p id="helper-text-email"
                                                      className="mt-1 ml-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="description" className="ml-1">Description</Label>
                                <Textarea id="description"
                                          placeholder="Describe your wishes for the photo shoot. Leave additional contact information if desired."
                                          rows={6} disabled={load}
                                          error={!!errors.description}
                                          className={!!errors.description ? "dark:placeholder-red-500" : ''}
                                          onChange={(e) => changeForm('description', e.target.value)}/>
                                {!!errors.description && <p id="helper-text-description"
                                                            className="mt-1 ml-1 text-sm text-red-500 dark:text-red-400">{errors.description}</p>}
                            </LabelInputContainer>
                            {/*<button
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                      type="submit">
                      Send &rarr;
                      <BottomGradient />
                        </button>*/}
                            <div className="mt-3">
                                <Rounded
                                    backgroundColor={'#27272A'}
                                    style={{
                                        borderRadius: '0.375em',
                                        padding: '10px 60px 10px 60px',
                                        zIndex: '1 !important',
                                    }}
                                    onClick={handleSubmit}
                                    disabled={load}
                                >
                                    <p className={load ? 'cursor-progress' : 'cursor-pointer'}>{load ? '🤔' : 'Send →'}</p>
                                </Rounded>
                            </div>

                            <div
                                className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>
                        </form>
                    </div>
                    <div className="w-full mb-8 p-4 lg:p-8 xs:mr-16  grid grid-cols-1 content-center justify-items-center">
                        <Calendar onChange={changeForm} error={!!errors.date} bookedDay={form.date} scheduledDays={dates}/>
                        {!!errors.date && <p id="helper-text-description"
                                             className="mt-1 ml-1 text-sm text-red-500 dark:text-red-400">{errors.date}</p>}
                    </div>
                </div>
            <AnimatedModal open={status} setOpen={setStatus} title={modalTitle} content={modalContent}/>
        </>
    )
}

const LabelInputContainer = ({
                                 children,
                                 className,
                             }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
