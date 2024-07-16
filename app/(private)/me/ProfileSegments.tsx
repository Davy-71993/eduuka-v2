"use client"

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/lib/actions/db_actions";
import { Profile } from "@/lib/types";
import { BookUser, Calendar, Camera, Mail, PersonStanding, PhoneIncoming, SlidersVertical, UserCheck } from "lucide-react";
import { ComponentType, ReactNode, useEffect, useRef, useState, useTransition } from "react";
import { FormGroup, FormSelect } from "./ads/create/fields";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { CDN_URL } from "@/lib/defaults";

export const PersonalInfo =  ({ profile }: { profile?: Profile }) => {

    const [updatedProfile, setUpdatedProfile] = useState(profile)
    
    const handleProfileUpdate = async() => {
        const res = await updateProfile(updatedProfile!)

        setUpdatedProfile(res)
        location.reload()
        
    }
    return (
        <div className="">
          <h1 className="text-2xl py-2 text-center font-bold">Personal Information</h1>
          <p className='pb-5 text-muted-foreground px-10'>Manage your personal information. This include names addresses and date of birth for easy identifiation and ad customization.</p>
          <div className="flex flex-wrap justify-center gap-5 py-5">
            <div className="border-2 shadow-lg w-fit min-w-80  rounded-sm p-5">
                <div className="flex w-full justify-between items-center pb-5">
                    <h1 className="text-lg font-thin"> Full Names</h1>
                    <EditDialog handler={ handleProfileUpdate } Icon={ UserCheck } title="Edit your Names">
                        <FormGroup label="First Name:" className="pb-2 pt-3">
                            <Input 
                                type="text" 
                                className="w-full text-lg py-2 px-8 bg-secondary border-none" 
                                value={ updatedProfile?.first_name ?? ''}
                                autoFocus
                                onChange={ 
                                    (e)=> { setUpdatedProfile({...updatedProfile, first_name: e.target.value}) } 
                                }
                                placeholder="First Name"/>
                        </FormGroup>
                        <FormGroup label="Last Name:" className="pb-2 pt-3">
                            <Input 
                                type="text" 
                                className="w-full text-lg py-2 px-8 bg-secondary border-none" 
                                value={ updatedProfile?.last_name ?? ''}
                                onChange={ 
                                    (e)=> { setUpdatedProfile({...updatedProfile, last_name: e.target.value}) } 
                                }
                                placeholder="Last Name"/>
                        </FormGroup>
                    </EditDialog>
                </div>
                <p className="text-xl">{ `${updatedProfile?.first_name ? updatedProfile?.first_name : ''} ${updatedProfile?.last_name ? updatedProfile?.last_name : ''}`}</p>
            </div>

            <div className="border-2 shadow-lg min-w-80 rounded-sm p-5">
                <div className="flex w-full justify-between items-center pb-5">
                    <h1 className="text-lg font-thin">Address</h1>
                    <EditDialog handler={ handleProfileUpdate } Icon={ BookUser } title="Edit your Address">
                        <FormGroup label="Your physical address" className="pb-2 pt-3 h-fit sm:h-fit">
                            <Textarea 
                                className="bg-secondary resize-none h-24 px-8"
                                value={ updatedProfile?.address ?? '' } 
                                onChange={ (e)=>{ setUpdatedProfile({ ...updatedProfile, address: e.target.value }) } } />
                        </FormGroup>
                    </EditDialog>
                </div>
                <p className="text-xl max-w-64 w-fit line-clamp-2">{ updatedProfile?.address && updatedProfile.address }</p>
            </div>

            <div className="border-2 shadow-lg min-w-80 rounded-sm p-5">
                <div className="flex w-full justify-between items-center pb-5">
                    <h1 className="text-lg font-thin">Date of Birth</h1>
                    <EditDialog handler={ handleProfileUpdate } Icon={ Calendar } title="Edit your Date of birth">
                        <FormGroup label="Select Date" className="pb-2 pt-3">
                            <Input type="date" 
                            autoFocus
                            value={ updatedProfile?.dob ?? ''}
                            onChange={ (e)=>{ setUpdatedProfile({...updatedProfile, dob: e.target.value}) } }
                            className="w-full text-lg py-2 px-8 bg-secondary border-none"/>
                        </FormGroup>
                    </EditDialog>
                </div>
                <p className="text-xl">{ new Date(updatedProfile?.dob ?? '').toDateString() }</p>
            </div>

            <div className="border-2 shadow-lg min-w-80 rounded-sm p-5">
                <div className="flex w-full justify-between items-center pb-5">
                    <h1 className="text-lg font-thin">Genda</h1>
                    <EditDialog handler={ handleProfileUpdate } Icon={ PersonStanding } title="Edit your Genda">
                        <FormSelect 
                            options={[{name: 'Male', value: 'male'}, { name: 'Female', value: 'female'}]} 
                            setter={(e)=>{ setUpdatedProfile({...updatedProfile, sex: e})}}
                            value={ updatedProfile?.sex ?? '' }/>
                    </EditDialog>
                </div>
                <p className="text-xl capitalize">{ updatedProfile?.sex }</p>
            </div>
          </div>
        </div>
    )
}

const EditDialog = ({ Icon, title, children, handler }: { Icon: ComponentType, title: string, children?: ReactNode, handler: ()=> void }) => {
    return (
        <Dialog>
            <DialogTrigger className="" >
                <Icon />
            </DialogTrigger>
            <DialogContent className="max-w-lg py-10 flex flex-col space-y-5 bg-secondary">
                <h1 className="text-center text-xl font-bold">{ title }</h1>

                <form action={ handler } className="flex flex-col space-y-8">
                    {
                        children
                    }
                    <DialogClose type="submit"
                    className="w-fit px-5 py-2 text-lg bg-primary/80 hover:bg-primary self-end transition-colors text-muted font-bold rounded-sm">
                        Submit
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export const ProfileImageCard = ({ profile }: { profile: Profile })=>{
    return (
        <>
            <div className="w-full max-w-44 h-auto rounded-full p-2 mx-auto border border-primary relative">
                <Link href='/me?p=profile-image' className="absolute bottom-2 border border-primary bg-secondary right-2 text-primary hover:bg-secondary h-10 w-10 flex justify-center items-center p-0 rounded-full">
                    <Camera />
                </Link>
                <Image priority src={ profile.image ||'/profile.jpg' } alt='profile image' height={1000} width={1000} className='w-full rounded-full h-auto' />
            </div>

            <h1 className="w-full text-xl text-center font-bold line-clamp-1 pt-5 overflow-hidden">
                { profile?.first_name } &nbsp; { profile?.last_name }
            </h1>
            <p className="overflow-hidden text-center w-full">{ profile?.email }</p>
        </>
    )
}

export const EditProfile = ({ profileID }: { profileID: string}) => {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageString, setImageString] = useState('/profile.jpg')
    const [dragOver, setDragOver] = useState(false)
    const [transition, startTransition] = useTransition()

    const dragZoneRef = useRef<HTMLDivElement | null>(null)

    const handleImageChange = (file: File | null) => {
        if(file){
            setImageFile(file)
        }
    }

    const saveProfilePicture = () => {
        if(!imageFile) return;

        // We use transition to indicate the loading state.
        startTransition(async()=>{

            // Get the file extension from the file name.
            const fileExtension = imageFile.name.split('.').pop()
            // Change the file name to be uniform.
            const fileName = `profile.${fileExtension}`
    
            try {
                // Create a supabase client.
                const supabase = createClient()
    
                // Fetch all images in the user's prodile folder and convert the files into a string array.
                // This is to make sure we always have only one profile image for each user.
                const list = await supabase.storage.from('profiles').list(profileID)
                const arrayToDelete = list.data?.map(elem => `${profileID}/${elem.name}`)
    
                // If the array is not empty then delete the entire folder.
                if(arrayToDelete && arrayToDelete.length > 0){
                    await supabase.storage.from('profiles').remove(arrayToDelete)
                }
    
                // Then upload the new profile image to the user's folder
                const { data, error } = await supabase
                    .storage
                    .from('profiles')
                    .upload(`/${profileID}/${fileName}`, imageFile)

                // If we don't get back the data for any error, stop
                if(!data) return;

                // Generate the image url and update the user's profile.
                const imageUrl = `${CDN_URL}/profiles/${data.path}`
                await updateProfile({
                    id: profileID,
                    image: imageUrl
                })

                // Relaod the page to reflect the changes.
                location.reload()
            } catch (error) {
                console.log(error)
            }

        })
    }

    useEffect(()=>{
        if (imageFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener("load", function () {
              setImageString(this.result as string)
            });    
        }
    }, [imageFile])

    useEffect(()=>{
        const zone = dragZoneRef.current
        if(!zone) return;

        zone.addEventListener('dragover', (e)=>{
            e.preventDefault()
            setDragOver(true)
        })

        zone.addEventListener('dragend', (e)=>{
            e.preventDefault()
            setDragOver(false)
        })

        zone.addEventListener('dragleave', (e)=>{
            e.preventDefault()
            setDragOver(false)
        })

        zone.addEventListener('drop', (e)=> {
            e.preventDefault()
        })
    }, [])

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-xl text-muted-foreground p-5 text-center w-full max-w-2xl">
                Click the choose image file button or drag and drop an image file bellow.
            </h1>
            <div
                ref={ dragZoneRef }
                className={`p-5 border-2 border-dashed rounded-sm ${ imageFile || dragOver ? ' border-green-500' : ''}`}>
                <Image src={ imageString } alt="Profile Image" height={1000} width={1000} 
                    className="w-full max-w-md mx-auto h-auto"/>
            </div>
            <div className="flex gap-5 justify-between">
                <Button onClick={ ()=> { document.getElementById('file-input')?.click() }} className="w-full max-w-sm">Choose Image file</Button>
                <Input accept="image/*" className="hidden" type="file" id="file-input" onChange={ (e) =>{ handleImageChange(e.target.files![0]) } } />
                <Button disabled={ transition } onClick={ saveProfilePicture } className="w-full max-w-sm">{ transition ? 'Loading...' : 'Save'}</Button>
            </div>
        </div>
    )
}

export const UserData =  ({ profile }: { profile?: Profile }) => {

    const [updatedProfile, setUpdatedProfile] = useState(profile)
    
    const handleProfileUpdate = async() => {
        const res = await updateProfile(updatedProfile!)

        setUpdatedProfile(res)
        location.reload()
        
    }
    return (
        <div className="">
            <h1 className="text-2xl py-2 text-center font-bold">User data and preferences.</h1>
            <p className='pb-5 text-muted-foreground px-10 text-center'>Manage your user data and setup the preferences.</p>
            <div className="flex flex-col md:flex-row justify-center gap-5 py-5">
                <div className="border-2 shadow-lg rounded-sm p-5 w-full ">
                    <div className="flex w-full justify-between items-center pb-5">
                        <h1 className="text-lg font-thin"> User Email</h1>
                        <Mail />
                    </div>
                    <p className="text-xl">{ updatedProfile?.email }</p>
                </div>

                <div className="border-2 shadow-lg rounded-sm p-5 w-full ">
                    <div className="flex w-full justify-between items-center pb-5">
                        <h1 className="text-lg font-thin">Phone Number</h1>
                        <PhoneIncoming />
                    </div>
                    <p className="text-xl max-w-64 w-fit line-clamp-2">{ updatedProfile?.phone && updatedProfile.phone }</p>
                </div>

            </div>
            <div className="border-2 shadow-lg min-w-80 rounded-sm p-5">
                <div className="flex w-full justify-between items-center pb-5">
                    <h1 className="text-lg font-thin">Preferences</h1>
                    <SlidersVertical />
                </div>
                <p className="text-xl">{ new Date(updatedProfile?.dob ?? '').toDateString() }</p>
            </div>
        </div>
    )
}

