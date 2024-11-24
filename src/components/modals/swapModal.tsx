import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { SIMPLE_SWAP_CONSTANTS } from "@/constants";
import { crypto } from "@/constants/simpleSwap/popularCrypto";
import { usdc } from "@/constants/simpleSwap/popularUSDC";
import { usdt } from "@/constants/simpleSwap/popularUSDT";
import { Button } from "../ui/button";
import debounce from "lodash.debounce";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useExternalWalletStore } from "@/store/externalWalletStore";

type ModalProps = {
  trigger: NonNullable<ReactNode>;
};

const SwapModal = ({ trigger }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState<string>("btc");
  const [selectedTo, setSelectedTo] = useState<string>("sui");
  const [cryptoAmount, setCryptoAmount] = useState<string>("");
  const [suiAmount, setSuiAmount] = useState<string>("");
  const [popularTab, setPopularTab] = useState<string>("crypto");

  const {
    metamaskAddress,
    phantomAddress,
  } = useExternalWalletStore();

  const currentAccount = useCurrentAccount();

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  const fetchConversion = useCallback(
    debounce( async (value: number, field: string="from", symbol="") => {
      try {
        let resp: any;
        if (field === "from") {
          resp = await axios.get(
            `${SIMPLE_SWAP_CONSTANTS.baseURL}/get_estimated?api_key=${SIMPLE_SWAP_CONSTANTS.apiKey}&fixed=false&currency_from=${symbol || selectedFrom}&currency_to=${selectedTo}&amount=${value}`,
          );
          console.log(selectedFrom);
          console.log("Amount: ", value);
          console.log(resp.data);
          setSuiAmount(Number(resp.data).toFixed(6));
        } else {
          resp = await axios.get(
            `${SIMPLE_SWAP_CONSTANTS.baseURL}/get_estimated?api_key=${SIMPLE_SWAP_CONSTANTS.apiKey}&fixed=false&currency_from=${symbol || selectedFrom}&currency_to=${selectedTo}&amount=${1}`,
          );
          console.log("Amount: ", value);
          console.log(resp.data);
          setCryptoAmount((value/resp.data).toFixed(6));
        }
      } catch (err) {
        console.log(err)
      }
    }, 500),
    [selectedFrom]
  );

  const handleFromChange = (amount: string) => {
    setCryptoAmount(amount);
    if(Number.isNaN(Number(amount)) || Number(amount) <= 0)
      return;
    fetchConversion(Number(amount), "from");
  }
  const handleToChange = (amount: string) => {
    console.log("ToChange: ", amount);
    setSuiAmount(amount);
    if(Number.isNaN(Number(amount)) || Number(amount) <= 0)
      return;
    fetchConversion(Number(amount), "to");
  }

  const handleSymbolChange = (symbol: string) => {
    setSelectedFrom(symbol);
    if(!Number.isNaN(Number(cryptoAmount)) && Number(cryptoAmount) > 0){
      console.log(selectedFrom);
      fetchConversion(Number(cryptoAmount), "from", symbol);}
    else if(!Number.isNaN(Number(suiAmount)) || Number(suiAmount) > 0)
      fetchConversion(Number(cryptoAmount), "to", symbol);
  }

  const handleBuy = async () => {
    if(Number.isNaN(Number(cryptoAmount)) || Number(cryptoAmount) <= 0)
      return;
    if(!currentAccount?.address)
      return
    const body = {
      "fixed": false,
      "currency_from": selectedFrom,
      "currency_to": selectedTo,
      "amount": Number(cryptoAmount),
      "address_to": currentAccount?.address,
      "extra_id_to": "",
      "user_refund_address": metamaskAddress || phantomAddress || "",
      "user_refund_extra_id": "123"
    }
    console.log(body);
    const response = await axios.post(
      `${SIMPLE_SWAP_CONSTANTS.baseURL}/create_exchange?api_key=${SIMPLE_SWAP_CONSTANTS.apiKey}`,
      body,
      {headers: {"Content-Type": "application/json"}}
    );
    console.dir(response.data, {depth: 3});
  }

  if(!metamaskAddress && !phantomAddress) {
    console.log(metamaskAddress, phantomAddress);
    console.log("Please connect a Sui Wallet and an External wallet first.")
    return;
  }
 
  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className='w-[90%] min-h-80 flex flex-col items-center rounded-md border-none !outline-none !ring-0 bg-[#141414] overflow-hidden gap-2 p-4 md:pt-12 md:px-6 !pb-6'>
      <DialogHeader className='pt-2 w-full h-20'>
        <DialogTitle className=''>
          <span>Swap Crypto</span>
        </DialogTitle>
      </DialogHeader>
      <div className='h-40'>
        <div className='flex flex-row h-16 m-2 aling-left'>
          <input
            type='number'
            value={Number(cryptoAmount) || 0}
            onChange={evt => {
              handleFromChange(evt.target.value);
            }}
            className='text-xl align-right text-slate-500'
          />
          <DropdownMenu>
            <DropdownMenuTrigger className='h-16'>
              <span className='w-[40%] bg-slate-300 hover:bg-slate-500'>
                {selectedFrom.toUpperCase()}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <div className='flex flex-row'>
                  <Button
                    onClick={evt => {
                      evt.preventDefault();
                      if (popularTab !== "crypto") setPopularTab("crypto");
                    }}
                    className={`${
                      popularTab === "crypto" ? "bg-blue-500" : "bg-slate-500"
                    }`}
                  >
                    Crypto
                  </Button>
                  <Button
                    onClick={evt => {
                      evt.preventDefault();
                      if (popularTab !== "usdc") setPopularTab("usdc");
                    }}
                    className={`${
                      popularTab === "usdc" ? "bg-blue-500" : "bg-slate-500"
                    }`}
                  >
                    USDC
                  </Button>
                  <Button
                    onClick={evt => {
                      evt.preventDefault();
                      if (popularTab !== "usdt") setPopularTab("usdt");
                    }}
                    className={`${
                      popularTab === "usdt" ? "bg-blue-500" : "bg-slate-500"
                    }`}
                  >
                    USDT
                  </Button>
                </div>
              </DropdownMenuItem>

              {popularTab === "crypto"
                ? crypto.map(pair => (
                    <DropdownMenuItem
                      key={pair.symbol}
                      onClick={() => {
                        handleSymbolChange(pair.symbol);
                      }}
                    >
                      <div className='w-[100%] bg-white hover:bg-slate-300'>
                        <span className='m-2'>{pair.symbol}</span>
                        <span className='m-2'>{pair.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))
                : popularTab === "usdc"
                ? usdc.map(pair => (
                    <DropdownMenuItem
                      key={pair.symbol}
                      onClick={() => {
                        handleSymbolChange(pair.symbol);
                      }}
                    >
                      <div className='w-[100%] bg-white hover:bg-slate-300'>
                        <span className='m-2'>{pair.symbol}</span>
                        <span className='m-2'>{pair.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))
                : usdt.map(pair => (
                    <DropdownMenuItem
                      key={pair.symbol}
                      onClick={() => {
                        handleSymbolChange(pair.symbol);
                      }}
                    >
                      <div className='w-[100%] bg-white hover:bg-slate-300'>
                        <span className='m-2'>{pair.symbol}</span>
                        <span className='m-2'>{pair.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex flex-row h-16 m-2 aling-left'>
          <input 
            type='text'
            value={suiAmount.toString()}
            onChange={evt => {handleToChange(evt.target.value);}}
            className='text-xl align-right text-slate-500'
          />
          <DropdownMenu>
            <DropdownMenuTrigger className='h-16'>
              <span className='w-[40%] bg-slate-300 hover:bg-slate-500'>
                {selectedTo.toUpperCase()}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTo("sui");
                }}
              >
                <span>SUI</span>
                <span>Sui</span>
              </DropdownMenuItem>
              {/* USDC Sui is not supported yet
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTo("usdcsui");
                }}
              >
                <span>USDC Sui</span>
                <span>usdcsui</span>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
        <Button onClick={handleBuy}>Buy</Button>
      </div>
    </DialogContent>
    </Dialog>
  );
};

export default SwapModal;
