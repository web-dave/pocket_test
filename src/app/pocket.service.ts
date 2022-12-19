import { Injectable } from '@angular/core';
import PocketBase, { Record } from 'pocketbase';
import {
  BehaviorSubject,
  from,
  Observable,
  ReplaySubject,
  scan,
  startWith,
  Subject,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PocketService {
  private pb = new PocketBase('http://127.0.0.1:8090');

  private bananananananas$$ = new ReplaySubject<Record>(1);

  bananas$: Observable<Record[]> = this.bananananananas$$.pipe(
    scan((prev, next) => {
      return [...prev, next];
    }, [] as Record[]),
    startWith([])
  );

  constructor() {
    this.init();
  }
  init() {
    // this.pb.collection('banana').subscribe('*', function (e) {
    //   console.log('===>', e.record);
    // });
    this.pb
      .collection('banana')
      .getFullList()
      .then((data) => {
        console.log(data);
        data.forEach((record) => this.bananananananas$$.next(record));
        this.pb.collection('banana').subscribe(
          '*',
          // this.pb.realtime.subscribe('banana',
          (data) => this.bananananananas$$.next(data.record)
        );
      });
  }
  auth() {
    this.pb
      .collection('users')
      .authWithPassword('foo@bar.com', '1234567890')
      .then((data) => {
        console.log(data);
      });
  }

  // operator(){
  //   const foo = intject()
  //   return ()=>{}
  // }

  // getData(name: string) {
  //   // this.auth();

  //   return this.pb
  //     .collection(name)
  //     .getList(1, 50)
  //     .then((data) => data.items);
  // }

  setData(name: string, data: { [key: string]: string }) {
    return this.pb.collection(name).create(data);
  }
}
