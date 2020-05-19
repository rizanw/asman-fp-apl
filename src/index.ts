import "reflect-metadata";
import container from "src/container.dependency";
import TYPES from "src/types.dependency";
import { IServer } from "src/ui/http/IServer";

const server = container.get<IServer>(TYPES.Server);
server.initialize();
server.start();
