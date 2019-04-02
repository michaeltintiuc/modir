import classNames from 'classnames/bind'
import React, { useContext } from 'react'
import IModite from '../../models/Modite'
import IModiteProfileResp from '../../models/ModiteProfileResp'
import ModiteContext from '../../state/modite'
import s from './styles.module.css'

// TODO: type correctly
function Details({ className = '' }: any) {
  const [activeModite]: [IModite, React.Dispatch<any>] = useContext(ModiteContext)
  const { profile = {} }: any = activeModite || {}
  let { fields } = profile

  const fetchProfile = async () => {
    if (!activeModite) {
      return
    }

    const moditeProfile: IModiteProfileResp = await fetch(`https://modus.app/modite/${activeModite.id}`).then(res =>
      res.json(),
    )
    activeModite.profile = moditeProfile.profile
    fields = moditeProfile.profile.fields
  }

  if (!fields) {
    fetchProfile()
    fields = {}
  }

  const image = profile && profile.image_192
  const name =
    activeModite && activeModite.real_name ? activeModite && activeModite.real_name : activeModite && activeModite.name
  const { Location: location } = fields
  const tod = activeModite && activeModite.tod
  const localDate = activeModite && activeModite.localDate
  const localTime = activeModite && activeModite.localTime

  const cx = classNames.bind(s)
  className = cx('moditeCt', className)

  return (
    <div className={className}>
      {image && <img src={image} />}
      <div className={s.title}>{name}</div>

      <div className={s.location}>{location}</div>
      <div>
        <span>{tod}</span>
        {localDate} - {localTime}
      </div>
    </div>
  )
}

export default Details