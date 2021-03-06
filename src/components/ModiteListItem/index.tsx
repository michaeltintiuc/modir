import React, { FunctionComponent } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import ModiteImage from '../ModiteImage'
import s from './styles.module.css'
import Project from '../../models/Project'
import { IonIcon } from '@ionic/react'
import Modite from '../../models/Modite'
import { RECORD_TYPES } from '../../constants/constants'
import ListItemProps from '../../types/components/ModiteListItem'
import Time from '../Time'

const ModiteItem = ({ modite }: { modite: Modite }) => (
  <div className={s.itemInnerCt}>
    <ModiteImage className={s.thumbContainer} modite={modite} />
    <div className={s.nameCt}>{modite.real_name}</div>
    <Time modite={modite} />
    <IonIcon ios="ios-arrow-forward" md="ios-arrow-forward" />
  </div>
)

const ProjectItem = ({ project }: { project: Project }) => (
  <div className={s.itemInnerCt}>
    <div className={s.nameCt}>{project.name}</div>
    <div>👤</div>
    <div className={s.projectUserCount}>{project.users.length}</div>
    <IonIcon ios="ios-arrow-forward" md="ios-arrow-forward" />
  </div>
)

const ModiteListItem: FunctionComponent<ListItemProps & RouteComponentProps> = ({ item }) => {
  const isProject: boolean = item.recordType === RECORD_TYPES.project

  return isProject ? <ProjectItem project={item as Project} /> : <ModiteItem modite={item} />
}

export default withRouter(ModiteListItem)
