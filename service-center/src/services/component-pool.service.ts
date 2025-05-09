import { Injectable, Logger } from '@nestjs/common';
import { Component, ComponentType, ComponentStatus } from '../interfaces/component.interface';
import { SmartphoneComponentFactory } from '../factories/component-factory';

@Injectable()
export class ComponentPoolService {
  private readonly logger = new Logger(ComponentPoolService.name);
  private components: Map<string, Component> = new Map();
  private factory: SmartphoneComponentFactory;

  constructor() {
    this.factory = SmartphoneComponentFactory.getInstance();
  }

  getComponent(type: ComponentType, model: string): Component {
    this.logger.debug(`Looking for component: ${type} for ${model}`);
    
    for (const component of this.components.values()) {
      if (component.type === type && 
          component.model === model && 
          component.status === ComponentStatus.NEW) {
        this.logger.debug(`Found existing component: ${component.id}`);
        return component;
      }
    }

    this.logger.debug(`No existing component found, creating new ${type} for ${model}`);
    const newComponent = this.factory.createComponent(type, model);
    this.components.set(newComponent.id, newComponent);
    this.logger.debug(`Created new component: ${newComponent.id}`);
    return newComponent;
  }

  getComponentById(id: string): Component | null {
    const component = this.components.get(id);
    if (component) {
      this.logger.debug(`Retrieved component by ID: ${id}`);
    } else {
      this.logger.debug(`Component not found by ID: ${id}`);
    }
    return component || null;
  }

  addComponent(component: Component) {
    this.components.set(component.id, component);
    this.logger.debug(`Added component to pool: ${component.type} for ${component.model} (ID: ${component.id})`);
  }

  removeComponent(id: string) {
    const component = this.components.get(id);
    if (component) {
      this.components.delete(id);
      this.logger.debug(`Removed component from pool: ${component.type} for ${component.model} (ID: ${id})`);
    } else {
      this.logger.debug(`Attempted to remove non-existent component: ${id}`);
    }
  }

  getPoolStatus(): Map<ComponentType, number> {
    const status = new Map<ComponentType, number>();
    
    for (const component of this.components.values()) {
      const count = status.get(component.type) || 0;
      status.set(component.type, count + 1);
    }

    this.logger.debug('Retrieved component pool status');
    return status;
  }

  getAllComponents(): Component[] {
    const components = Array.from(this.components.values());
    this.logger.debug(`Retrieved all components: ${components.length} total`);
    return components;
  }
} 