import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { useAppSelector, useAppDispatch } from "@/utilities/hooks";
import Link from "next/link";
import { actionSettings } from "../../store/actions/modal";
import { axiosQuery } from "@/utilities/utilities";
import { updateProfile } from "@/store/userSlice";

import { getDroppedOrSelectedFiles } from "html5-file-selector";

import Dropzone from "react-dropzone-uploader";

interface Image {
  file: File;
  preview?: string;
}

type Payload =
  | {
      name: string;
    }
  | FormData;

export default function Settings() {
  const settingsModal = useAppSelector((state) => state.modalSettings);
  const { profilePic, name, login } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const settingsModalAction = () => dispatch(actionSettings());

  const [checked, setChecked] = useState(true);
  const handleChecked = () => {
    setChecked(!checked);
  };
  const [nickname, setNickname] = useState(name);
  const [image, setImage] = useState<Image>(null);

  const editProfile = async (payload: Payload) => {
    const res = await axiosQuery({ url: `/users`, method: "patch", payload });
    dispatch(updateProfile({ name: res.data.name, profilePic: res.data.profilePic }));
  };

  const inputRef = useRef();

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  // called every time a file's `status` changes
  const handleAddPreview = ({ meta, file }, status) => {
    // console.log(file);
    if (status === "done") {
      setImage({ file, preview: meta.previewUrl });
    }
  };

  const Input = ({ accept, onFiles, files }) => {
    console.log(onFiles);
    return (
      <>
        <label className={`dzu-inputLabel`} style={{ position: "relative", height: 100 }}>
          {image ? (
            <img className='w-100 h-100' src={image.preview} alt='' />
          ) : profilePic ? (
            <img className='w-100 h-100' src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/users/${profilePic}`} alt='' />
          ) : (
            <img className='w-100 h-100' src='../images/anonymous.png' alt='' />
          )}
          <input
            disabled={false}
            ref={inputRef}
            style={{ display: "none" }}
            type='file'
            accept={accept}
            onChange={(e) => {
              getFilesFromEvent(e).then((chosenFiles) => {
                onFiles(chosenFiles);
              });
            }}
          />
        </label>
      </>
    );
  };

  const Preview = () => {
    return <></>;
  };

  return (
    <>
      <button onClick={settingsModalAction} className='btn btn_config position-absolute top-0 end-0'>
        <img src='../images/config.svg' alt='' />
      </button>
      <Modal
        isOpen={settingsModal}
        onRequestClose={settingsModalAction}
        contentLabel=''
        className='allModal modal-settings d-flex flex-column'>
        <button onClick={settingsModalAction} className='btn btn_modal-close position-absolute'>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <g clipPath='url(#clip0_243_6669)'>
              <path
                d='M15.8045 0.195557C15.6795 0.0705765 15.51 0.000366211 15.3332 0.000366211C15.1564 0.000366211 14.9869 0.0705765 14.8619 0.195557L7.99986 7.05756L1.13786 0.195557C1.01284 0.0705765 0.8433 0.000366211 0.666524 0.000366211C0.489748 0.000366211 0.320209 0.0705765 0.195191 0.195557V0.195557C0.0702103 0.320576 0 0.490114 0 0.666891C0 0.843667 0.0702103 1.01321 0.195191 1.13822L7.05719 8.00022L0.195191 14.8622C0.0702103 14.9872 0 15.1568 0 15.3336C0 15.5103 0.0702103 15.6799 0.195191 15.8049V15.8049C0.320209 15.9299 0.489748 16.0001 0.666524 16.0001C0.8433 16.0001 1.01284 15.9299 1.13786 15.8049L7.99986 8.94289L14.8619 15.8049C14.9869 15.9299 15.1564 16.0001 15.3332 16.0001C15.51 16.0001 15.6795 15.9299 15.8045 15.8049C15.9295 15.6799 15.9997 15.5103 15.9997 15.3336C15.9997 15.1568 15.9295 14.9872 15.8045 14.8622L8.94252 8.00022L15.8045 1.13822C15.9295 1.01321 15.9997 0.843667 15.9997 0.666891C15.9997 0.490114 15.9295 0.320576 15.8045 0.195557V0.195557Z'
                fill='#18130C'
              />
            </g>
            <defs>
              <clipPath id='clip0_243_6669'>
                <rect width='16' height='16' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </button>
        <div className='modal-title text-center'>Настройки</div>
        <div className='d-flex flex-column align-items-center'>
          <div className='change-avatar d-flex flex-column align-items-center'>
            <div className='ava-image'>
              <Dropzone
                onChangeStatus={handleAddPreview}
                PreviewComponent={Preview}
                accept='image/*'
                InputComponent={Input}
                maxFiles={100}
              />
            </div>
            <button
              className='btn btn_change-ava text-center'
              type='button'
              onClick={() => {
                console.log(image);
                // const payload = new FormData();
                // payload.append("profilePic", image.file);
                // editProfile(payload);
              }}>
              {image ? "Загрузить фото" : "Нажмите, чтобы выбрать фото"}
            </button>
          </div>
          <div className='settings-content settings-top w-100'>
            <div className='settings-item d-flex align-items-center justify-content-between w-100'>
              <div className='d-flex align-items-center' style={{ gap: 18 }}>
                <div className='settings-item_icon m-20'>
                  <img className='w-100 h-100' src='../images/smiley.svg' alt='' />
                </div>
                <div className='setting-item-text'>
                  <input className='m-0' value={nickname} onChange={(e) => setNickname(e.target.value)} style={{ borderWidth: 0 }} />
                </div>
              </div>
              <button className='btn btn_change-ava text-center' type='button' onClick={() => editProfile({ name: nickname })}>
                Изменить
              </button>
            </div>
            <div className='settings-item d-flex align-items-center w-100'>
              <div className='settings-item_icon'>
                <img className='w-100 h-100' src='../images/s1.svg' alt='' />
              </div>
              <div className='setting-item-text'>
                <p className='m-0'>{login}</p>
              </div>
            </div>
            {/* <div className='settings-item d-flex align-items-center w-100'>
              <div className='settings-item_icon'>
                <img className='w-100 h-100' src='../images/s2.png' alt='' />
              </div>
              <div className='setting-item-text'>
                <p className='m-0'>Вы вошли через Google</p>
              </div>
            </div> */}
          </div>
          <div className='settings-content settings-middle w-100'>
            {/* <div className='settings-item d-flex align-items-start w-100'>
              <div className='settings-item_icon'>
                <img className='w-100 h-100' src='../images/s3.svg' alt='' />
              </div>
              <div className='setting-item-text'>
                <p className='m-0'>Уведомления</p>
                <span>Новые сообщения</span>
              </div>
              <div className='toggle-notifications d-flex align-items-center ms-auto'>
                {checked ? "вкл." : "выкл."}
                <label className='switch-item'>
                  <input onChange={handleChecked} type='checkbox' checked={checked} />
                  <span className={`slider round ${checked ? "checked" : ""}`}></span>
                </label>
              </div>
            </div> */}
            <Link href='/profile/invite' className='settings-item settings-item_friend d-flex align-items-start position-relative w-100'>
              <div className='settings-item_icon'>
                <img className='w-100 h-100' src='../images/s4.svg' alt='' />
              </div>
              <div className='setting-item-text'>
                <p className='m-0'>Пригласить друга</p>
                <span>Получите +10% от первого оплаты</span>
              </div>
            </Link>
          </div>
          <div className='settings-content settings-bottom w-100'>
            <Link href='/chat' className='settings-item d-flex align-items-center w-100'>
              <div className='settings-item_icon'>
                <img className='w-100 h-100' src='../images/s5.svg' alt='' />
              </div>
              <div className='setting-item-text'>
                <p className='m-0'>Написать в поддержку</p>
              </div>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
