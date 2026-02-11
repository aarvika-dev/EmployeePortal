import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type EmployeeStatus = 'Active' | 'On Leave' | 'Inactive';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  startDate: string;
  location: string;
  manager: string;
  salary: number;
}

interface EmployeeForm {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  startDate: string;
  location: string;
  manager: string;
  salary: number;
}

const STATUS_OPTIONS: EmployeeStatus[] = ['Active', 'On Leave', 'Inactive'];

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  employees: Employee[] = [
    {
      id: 'EMP-1001',
      name: 'Avery Jackson',
      email: 'avery.jackson@empportal.com',
      phone: '(212) 555-0112',
      role: 'Engineering Manager',
      department: 'Engineering',
      status: 'Active',
      startDate: '2021-05-10',
      location: 'New York, NY',
      manager: 'Sophie Laurent',
      salary: 148000
    },
    {
      id: 'EMP-1002',
      name: 'Priya Nair',
      email: 'priya.nair@empportal.com',
      phone: '(512) 555-0181',
      role: 'Product Designer',
      department: 'Design',
      status: 'Active',
      startDate: '2022-02-01',
      location: 'Austin, TX',
      manager: 'Morgan Lee',
      salary: 112000
    },
    {
      id: 'EMP-1003',
      name: 'Carlos Mendez',
      email: 'carlos.mendez@empportal.com',
      phone: '(773) 555-0164',
      role: 'QA Analyst',
      department: 'Quality',
      status: 'On Leave',
      startDate: '2020-11-18',
      location: 'Chicago, IL',
      manager: 'Avery Jackson',
      salary: 86000
    },
    {
      id: 'EMP-1004',
      name: 'Elena Rossi',
      email: 'elena.rossi@empportal.com',
      phone: '(206) 555-0148',
      role: 'DevOps Engineer',
      department: 'Engineering',
      status: 'Active',
      startDate: '2019-08-22',
      location: 'Seattle, WA',
      manager: 'Avery Jackson',
      salary: 132000
    },
    {
      id: 'EMP-1005',
      name: 'Jamal Carter',
      email: 'jamal.carter@empportal.com',
      phone: '(404) 555-0139',
      role: 'HR Manager',
      department: 'People Ops',
      status: 'Active',
      startDate: '2018-03-15',
      location: 'Atlanta, GA',
      manager: 'Sophie Laurent',
      salary: 98000
    },
    {
      id: 'EMP-1006',
      name: 'Mei Chen',
      email: 'mei.chen@empportal.com',
      phone: '(415) 555-0195',
      role: 'Finance Analyst',
      department: 'Finance',
      status: 'Inactive',
      startDate: '2017-09-04',
      location: 'San Francisco, CA',
      manager: 'Harper Nguyen',
      salary: 101000
    },
    {
      id: 'EMP-1007',
      name: 'Noah Brooks',
      email: 'noah.brooks@empportal.com',
      phone: '(303) 555-0152',
      role: 'Customer Success Lead',
      department: 'Customer Success',
      status: 'Active',
      startDate: '2023-06-12',
      location: 'Denver, CO',
      manager: 'Jamie Patel',
      salary: 94000
    },
    {
      id: 'EMP-1008',
      name: 'Lucia Gomez',
      email: 'lucia.gomez@empportal.com',
      phone: '(305) 555-0128',
      role: 'Sales Lead',
      department: 'Sales',
      status: 'Active',
      startDate: '2020-01-20',
      location: 'Miami, FL',
      manager: 'Jamie Patel',
      salary: 118000
    }
  ];

  searchText = '';
  statusFilter: 'all' | EmployeeStatus = 'all';
  departmentFilter: 'all' | string = 'all';
  sortBy: 'name' | 'department' | 'startDate' | 'salary' = 'name';
  sortDir: 'asc' | 'desc' = 'asc';
  selectedId: string | null = this.employees[0]?.id ?? null;
  editingId: string | null = null;
  formError = '';
  form: EmployeeForm = this.createEmptyForm();

  readonly statusOptions = STATUS_OPTIONS;
  private readonly currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  get totalCount(): number {
    return this.employees.length;
  }

  get activeCount(): number {
    return this.employees.filter((employee) => employee.status === 'Active').length;
  }

  get onLeaveCount(): number {
    return this.employees.filter((employee) => employee.status === 'On Leave').length;
  }

  get departmentCount(): number {
    return this.departments.length;
  }

  get payrollTotal(): number {
    return this.employees.reduce((total, employee) => total + employee.salary, 0);
  }

  get averageSalary(): number {
    if (!this.employees.length) {
      return 0;
    }
    return Math.round(this.payrollTotal / this.employees.length);
  }

  get departments(): string[] {
    return Array.from(new Set(this.employees.map((employee) => employee.department)))
      .filter((value) => value)
      .sort((a, b) => a.localeCompare(b));
  }

  get managers(): string[] {
    return Array.from(new Set(this.employees.map((employee) => employee.manager)))
      .filter((value) => value)
      .sort((a, b) => a.localeCompare(b));
  }

  get selectedEmployee(): Employee | null {
    return this.employees.find((employee) => employee.id === this.selectedId) ?? null;
  }

  get filteredEmployees(): Employee[] {
    const query = this.searchText.trim().toLowerCase();
    const status = this.statusFilter;
    const department = this.departmentFilter;

    const filtered = this.employees.filter((employee) => {
      const matchesQuery =
        !query ||
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query);

      const matchesStatus = status === 'all' || employee.status === status;
      const matchesDepartment = department === 'all' || employee.department === department;

      return matchesQuery && matchesStatus && matchesDepartment;
    });

    return filtered.sort((a, b) => this.compareEmployees(a, b));
  }

  formatCurrency(value: number): string {
    return this.currency.format(value);
  }

  toggleSortDir(): void {
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
  }

  clearFilters(): void {
    this.searchText = '';
    this.statusFilter = 'all';
    this.departmentFilter = 'all';
    this.sortBy = 'name';
    this.sortDir = 'asc';
  }

  selectEmployee(id: string): void {
    this.selectedId = id;
  }

  startCreate(): void {
    this.editingId = null;
    this.formError = '';
    this.form = this.createEmptyForm();
  }

  startEditSelected(): void {
    if (!this.selectedEmployee) {
      return;
    }
    this.startEdit(this.selectedEmployee.id);
  }

  startEdit(id: string): void {
    const employee = this.employees.find((item) => item.id === id);
    if (!employee) {
      return;
    }
    this.editingId = employee.id;
    this.formError = '';
    this.form = { ...employee };
  }

  resetForm(): void {
    if (this.editingId) {
      this.startEdit(this.editingId);
      return;
    }
    this.startCreate();
  }

  saveEmployee(): void {
    if (!this.form.name.trim() || !this.form.email.trim() || !this.form.role.trim()) {
      this.formError = 'Name, email, and role are required.';
      return;
    }

    this.formError = '';

    if (this.editingId) {
      this.employees = this.employees.map((employee) =>
        employee.id === this.editingId ? { ...employee, ...this.form } : employee
      );
      this.selectedId = this.editingId;
      return;
    }

    const newEmployee: Employee = {
      id: this.nextEmployeeId(),
      ...this.form
    };

    this.employees = [newEmployee, ...this.employees];
    this.selectedId = newEmployee.id;
    this.form = this.createEmptyForm();
  }

  removeEmployee(id: string): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    if (this.selectedId === id) {
      this.selectedId = this.employees[0]?.id ?? null;
    }
    if (this.editingId === id) {
      this.editingId = null;
      this.form = this.createEmptyForm();
    }
  }

  removeSelected(): void {
    if (!this.selectedEmployee) {
      return;
    }
    this.removeEmployee(this.selectedEmployee.id);
  }

  private createEmptyForm(): EmployeeForm {
    return {
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      status: 'Active',
      startDate: this.todayIso(),
      location: '',
      manager: '',
      salary: 0
    };
  }

  private todayIso(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private nextEmployeeId(): string {
    const numbers = this.employees
      .map((employee) => Number(employee.id.replace('EMP-', '')))
      .filter((value) => !Number.isNaN(value));
    const next = numbers.length ? Math.max(...numbers) + 1 : 1001;
    return `EMP-${String(next).padStart(4, '0')}`;
  }

  private compareEmployees(a: Employee, b: Employee): number {
    const direction = this.sortDir === 'asc' ? 1 : -1;

    switch (this.sortBy) {
      case 'department':
        return direction * a.department.localeCompare(b.department);
      case 'startDate':
        return direction * a.startDate.localeCompare(b.startDate);
      case 'salary':
        return direction * (a.salary - b.salary);
      case 'name':
      default:
        return direction * a.name.localeCompare(b.name);
    }
  }
}
