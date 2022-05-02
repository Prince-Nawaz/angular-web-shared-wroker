import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-web-shared-worker';
  worker: any;
  sharedWorker: any;

  ngOnInit() {
    // console.log(generateFibonacci(42));
    this.#initWebWorker();
    this.#initSharedWorker();
  }

  #initWebWorker() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      console.log(new URL('./app.worker', import.meta.url), import.meta.url);
      this.worker = new Worker(new URL('./app.worker', import.meta.url));
      this.worker.onmessage = ({ data }: { data: any }) => {
        console.log(`worker page got message: ${data}`);
      };
      this.worker.onerror = (err: any) => {
        console.log(`error occurred: ${err}`);
      };
      this.worker.postMessage({ action: 'generateFibonacci', param: 42 });
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  #initSharedWorker() {
    if (typeof SharedWorker !== 'undefined') {
      // Create a new
      console.log(new URL('./app.shared.worker', import.meta.url), import.meta.url);
      this.sharedWorker = new SharedWorker(new URL('./app.shared.worker', import.meta.url));
      this.sharedWorker.port.onmessage = ({ data }: { data: any }) => {
        console.log(`shared worker page got message: ${data}`);
      };
      this.sharedWorker.port.onmessageerror = (err: any) => {
        console.log(`error occurred: ${err}`);
      };
      this.sharedWorker.port.postMessage({ action: 'generateFibonacci', param: 42 });
    } else {
      // Shared Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  sendWorkerMessage() {
    this.worker.postMessage({ action: 'generateFibonacci', param: 42 });
  }

  terminateWorker() {
    this.worker.terminate();
  }

  sendSharedWorkerMessage() {
    this.sharedWorker.port.postMessage({ action: 'generateFibonacci', param: 42 });
  }

  terminateSharedWorker() {
    this.sharedWorker.port.postMessage({ action: 'terminate' });
  }
}