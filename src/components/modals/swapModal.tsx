import {
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
import { useEffect, useState } from "react";
import { SIMPLE_SWAP_CONSTANTS } from "@/constants";
import { crypto } from "@/constants/simpleSwap/popularCrypto";
import { usdc } from "@/constants/simpleSwap/popularUSDC";
import { usdt } from "@/constants/simpleSwap/popularUSDT";
import { Button } from "../ui/button";

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SwapModal = ({ setModalOpen }: ModalProps) => {
  const [selectedFrom, setSelectedFrom] = useState<string>("btc");
  const [selectedTo, setSelectedTo] = useState<string>("usdcsui");
  const [cryptoAmount, setCryptoAmount] = useState<string>("");
  const [popularTab, setPopularTab] = useState<string>("crypto");

  const handlerFocusOut = async () => {
    const resp = await axios.get(
      `${SIMPLE_SWAP_CONSTANTS.baseURL}/get_estimated?api_key=${SIMPLE_SWAP_CONSTANTS.apiKey}&fixed=false&currency_from=${selectedFrom}&currency_to=${selectedTo}&amount=${cryptoAmount}`,
    );
    console.log(resp)
  };

  return (
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
              setCryptoAmount(evt.target.value);
            }}
            className='text-xl align-right text-slate-500'
            onBlur={evt => {
              handlerFocusOut();
            }}
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
                        setSelectedFrom(pair.symbol);
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
                        setSelectedFrom(pair.symbol);
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
                        setSelectedFrom(pair.symbol);
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
          <input type='number' disabled />
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
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTo("usdcsui");
                }}
              >
                <span>USDC Sui</span>
                <span>usdcsui</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>button to accept</div>
    </DialogContent>
  );
};

export default SwapModal;
