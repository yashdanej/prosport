// import React, { useState, useEffect } from 'react';
// import { Container, Nav, NavItem, NavLink, Modal, Button, Table } from 'reactstrap';
// import PlanCard from './PlanCard'; // Assuming PlanCard is a separate component
// import PlanDetailsModal from './PlanDetailsModal';
// import PlanComparisonModal from './PlanComparisonModal';

// const fetchPlans = async () => {
//   try {
//     const response = await fetch('/api/plans');
//     if (!response.ok) throw new Error('Failed to fetch plans');
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching plans:', error);
//     throw error;
//   }
// };

// const TestSub = () => {
//   const [activeTab, setActiveTab] = useState('all');
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     fetchPlans().then(setPlans).catch(e => alert('Error loading plans'));
//   }, []);

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(plan);
//     setModalOpen(true);
//   };

//   const handleModalToggle = () => setModalOpen(!modalOpen);

//   const renderTabs = () => {
//     const uniqueGames = ['All', ...new Set(plans.map(plan => plan.game))];
//     return uniqueGames.map(game => (
//       <NavItem key={game}>
//         <NavLink active={activeTab === game.toLowerCase()} onClick={() => setActiveTab(game.toLowerCase())}>
//           {game}
//         </NavLink>
//       </NavItem>
//     ));
//   };

//   return (
//     <Container fluid className="p-4">
//       <h1 className="mb-4">Subscription Plans</h1>
//       <Nav tabs className="mb-4">{renderTabs()}</Nav>
//       <Button color="info" className="mb-4" onClick={() => setModalOpen(true)}>
//         Compare All Plans
//       </Button>
//       {plans.filter(plan => activeTab === 'all' || plan.game.toLowerCase() === activeTab).map(plan => (
//         <PlanCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
//       ))}
//       {selectedPlan && (
//         <PlanDetailsModal plan={selectedPlan} isOpen={modalOpen} toggle={handleModalToggle} />
//       )}
//       <PlanComparisonModal plans={plans} isOpen={modalOpen} toggle={() => setModalOpen(false)} />
//     </Container>
//   );
// };

// export default TestSub;
