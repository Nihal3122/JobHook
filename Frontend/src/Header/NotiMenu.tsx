import { Indicator, Menu, Notification, Stack } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getNotifications, readNotification } from "../Services/NotiService";
import { useNavigate } from "react-router-dom";

const NotiMenu = () => {
  const [opened, setOpened] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.id) {
      getNotifications(user.id)
        .then((res) => {
          console.log(res);
          setNotifications(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const unread = (index: any) => {
    let notis = [...notifications];
    notis = notis.filter((noti: any, i: number) => i != index);
    setNotifications(notis);
    readNotification(notifications[index].id)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="bg-[#3d3d3d] w-10 h-10 flex items-center justify-center p-1.5 rounded-full">
          <Indicator
            disabled={notifications.length <= 0}
            offset={4}
            color="brightSun.4"
            processing
          >
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <div className="flex flex-col gap-1">
          {notifications?.map((noti: any, index: any) => {
            return (
              <Notification
                onClick={() => {
                  navigate(noti.route);
                  unread(index);
                  setOpened(false);
                }}
                onClose={() => unread(index)}
                className="hover:bg-[#2d2d2d] cursor-pointer"
                icon={<IconCheck size={20} />}
                color="teal"
                title={noti.action}
                mt="md"
              >
                {noti.message}
              </Notification>
            );
          })}
          {notifications.length == 0 && (
            <div className="text-center text-[#b0b0b0]">No Notification</div>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotiMenu;
