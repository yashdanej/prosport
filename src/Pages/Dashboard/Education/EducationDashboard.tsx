import ContainerEducation from '../../../Componant/Dashboard/Education/Education'

const EducationDashboard = ({analytics = false}) => {
  return (
    <div className="page-body">
      <ContainerEducation analytics={analytics} />
    </div>
  )
}

export default EducationDashboard