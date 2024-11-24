import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useSDK } from "@metamask/sdk-react";
import { useExternalWalletStore } from "@/store/externalWalletStore";
import { useWeb3React } from "@web3-react/core";

type Props = {
  trigger: NonNullable<ReactNode>;
};

const ConnectExternalModal = ({ trigger }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const {
    metamaskAddress,
    phantomAddress,
    setMetamaskAddress,
    setPhantomAddress,
  } = useExternalWalletStore();
  const { connector, hooks } = useWeb3React();
  const {useSelectedAccount } = hooks;
  const phantomAccount = useSelectedAccount(connector);

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  const metamaskBtnHandler = async () => {
    try {
      const accounts = await sdk?.connect();
      if(accounts && accounts.length > 0)
        setMetamaskAddress(accounts[0]);
      else
        throw("No metamask address found");
        console.log(accounts[0]);

    } catch (err) {
      console.warn("Failed to connect to metamask with error: ", err);
    }
  };

  const phantomBtnHandler = async () => {
    try {
      const resp = await connector.activate(1);
      console.log("YOLELELE", resp);
      if(phantomAccount) {
        setPhantomAddress(phantomAccount);
      }
    } catch (err) {
      console.warn("Failed to connect to phantom wallet with error: ", err)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className='flex flex-col gap-4'>
        <DialogTitle asChild>
          <h2 className='text-slate-500'>Connect a Wallet</h2>
        </DialogTitle>
        <Button className='text-slate-500' onClick={metamaskBtnHandler}>
          <Image
            src='/externalWallets/metamask.svg'
            alt='metamask'
            width={20}
            height={20}
          />
          Metamask
        </Button>
        <Button className='text-slate-500' onClick={phantomBtnHandler}>
          <Image
            src='/externalWallets/phantom.svg'
            alt='phantom'
            width={20}
            height={20}
          />
          Phantom
        </Button>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export { ConnectExternalModal };
