import react from 'react';
import Modal from 'react-modal';

const menuModalStyle = {
	overlay: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		width: '881px',
		height: '679px',
		backgroundColor: 'rgba(0, 0, 0, 0)',
		zIndex: 100,
		left: '51%',
		transform: 'translateX(-50%)',
	},

	content: {
		position: 'absolute',
		top: '40px',
		left: '40px',
		right: '40px',
		bottom: '40px',
		border: '1px solid #ccc',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '4px',
		outline: 'none',
		width: '750px',
		padding: '10px',
		height: '578.04px',
		backgroundColor: '#1B9659',
	}
};

const RankMenu = ({ stateData }) => {

	return (
		<>
			<Modal id="menuModal" isOpen={stateData.isMenuOpen} style={menuModalStyle}>
				<div id="backBtn" onClick={stateData.room.isMenuOpenFun}>X</div>
				<div className="menuWraper">
					<div className="menuTitle">오늘의<br />베스트 안주는</div>
					<div className="menuRankContainer">
						<div className="menuRankLeft">
							<div className="LeftName">1위 <br />청춘 김민석</div>
							<div className="LeftTitle">마른 오징어</div>
							<div className="LeftImage">이미지</div>
							<div className="LeftBadgeContainer">
								받은뱃지
								<div className="LeftBadges">
									<div className="LeftBadge">+</div>
									<div className="LeftBadge">+</div>
									<div className="LeftBadge">+</div>
								</div>
							</div>
						</div>
						<div className="menuRankRight">
							<div className="menuRankRightWrapper">
								<div className="menuRangkRightContainer">
									<div className="rightRank">2위</div>
									<div className="rightTitle">청춘 김민석</div>
									<div className="rightBadgeContainer">
										<div className="rightBadgeTitle">받은뱃지</div>
										<div className="rightBadges">
											<div className="rightBadge">+</div>
											<div className="rightBadge">+</div>
											<div className="rightBadge">+</div>
											<div className="rightBadge">+</div>
										</div>
									</div>
								</div>
								<div className="rightImage">이미지</div>
							</div>

							<div className="menuRankRightWrapper">
								<div className="menuRangkRightContainer">
									<div className="rightRank">2위</div>
									<div className="rightTitle">청춘 김민석</div>
									<div className="rightBadgeContainer">
										<div className="rightBadgeTitle">받은뱃지</div>
										<div className="rightBadges">
											<div className="rightBadge">+</div>
											<div className="rightBadge">+</div>
											<div className="rightBadge">+</div>
											<div className="rightBadge">+</div>
										</div>
									</div>
								</div>
								<div className="rightImage">이미지</div>
							</div>

							<div className="menuRankRightWrapper">
								<div className="menuRangkRightContainer">
									<div className="rightRank">2위</div>
									<div className="rightTitle">청춘 김민석</div>
									<div className="rightBadgeContainer">
										<div className="rightBadgeTitle">받은뱃지</div>
										<div className="rightBadges">
											<div className="rightBadge">+</div>
											<div className="rightBadge">+</div>
											<div className="rightBadge">+</div>
											<div className="rightBadge">+</div>
										</div>
									</div>
								</div>
								<div className="rightImage">이미지</div>
							</div>
						</div>
					</div>
				</div>
                    </Modal>
		</>
	)

}

export default RankMenu;