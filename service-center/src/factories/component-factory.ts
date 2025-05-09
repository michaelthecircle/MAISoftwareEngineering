import { Component, ComponentType, ComponentStatus } from '../interfaces/component.interface';

export abstract class ComponentFactory {
  abstract createComponent(type: ComponentType, model: string): Component;
}

export class SmartphoneComponentFactory extends ComponentFactory {
  private static instance: SmartphoneComponentFactory;
  private componentPrototypes: Map<ComponentType, Component> = new Map();

  private constructor() {
    super();
    this.initializePrototypes();
  }

  public static getInstance(): SmartphoneComponentFactory {
    if (!SmartphoneComponentFactory.instance) {
      SmartphoneComponentFactory.instance = new SmartphoneComponentFactory();
    }
    return SmartphoneComponentFactory.instance;
  }

  private initializePrototypes() {
    this.componentPrototypes.set(ComponentType.SCREEN, {
      id: 'prototype-screen',
      type: ComponentType.SCREEN,
      status: ComponentStatus.NEW,
      model: 'generic',
      serialNumber: 'proto-001',
      isOriginal: true,
      repairHistory: [],
      clone() {
        return { ...this, id: `screen-${Date.now()}` };
      }
    });

    this.componentPrototypes.set(ComponentType.BATTERY, {
      id: 'prototype-battery',
      type: ComponentType.BATTERY,
      status: ComponentStatus.NEW,
      model: 'generic',
      serialNumber: 'proto-002',
      isOriginal: true,
      repairHistory: [],
      clone() {
        return { ...this, id: `battery-${Date.now()}` };
      }
    });

    this.componentPrototypes.set(ComponentType.CAMERA, {
      id: 'prototype-camera',
      type: ComponentType.CAMERA,
      status: ComponentStatus.NEW,
      model: 'generic',
      serialNumber: 'proto-003',
      isOriginal: true,
      repairHistory: [],
      clone() {
        return { ...this, id: `camera-${Date.now()}` };
      }
    });

    this.componentPrototypes.set(ComponentType.MOTHERBOARD, {
      id: 'prototype-motherboard',
      type: ComponentType.MOTHERBOARD,
      status: ComponentStatus.NEW,
      model: 'generic',
      serialNumber: 'proto-004',
      isOriginal: true,
      repairHistory: [],
      clone() {
        return { ...this, id: `motherboard-${Date.now()}` };
      }
    });

    this.componentPrototypes.set(ComponentType.SPEAKER, {
      id: 'prototype-speaker',
      type: ComponentType.SPEAKER,
      status: ComponentStatus.NEW,
      model: 'generic',
      serialNumber: 'proto-005',
      isOriginal: true,
      repairHistory: [],
      clone() {
        return { ...this, id: `speaker-${Date.now()}` };
      }
    });
  }

  createComponent(type: ComponentType, model: string): Component {
    const prototype = this.componentPrototypes.get(type);
    if (!prototype) {
      throw new Error(`No prototype found for component type: ${type}`);
    }

    const component = prototype.clone();
    component.model = model;
    component.serialNumber = `${type.toLowerCase()}-${Date.now()}`;
    return component;
  }
} 