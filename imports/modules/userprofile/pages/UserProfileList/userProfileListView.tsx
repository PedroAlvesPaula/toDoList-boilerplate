import React, { useContext, useState } from 'react';
import { UserProfileListControllerContext } from './userProfileListController';
import { SysCardUser } from '../../components/sysCardUser/sysCardUser';

const UserProfileLisView = () => {
	const context = useContext(UserProfileListControllerContext);
	const { list } = context;

	return (
		<>
			{list &&
				list?.map((user) => {
					return <SysCardUser key={user._id} username={user.username} email={user.email} userId={user._id!} />;
				})}
		</>
	);
};

export default UserProfileLisView;
